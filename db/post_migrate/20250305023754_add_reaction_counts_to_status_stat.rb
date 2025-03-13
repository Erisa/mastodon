# frozen_string_literal: true

class AddReactionCountsToStatusStat < ActiveRecord::Migration[8.0]
  def up
    Status.unscoped.joins(:status_reactions).distinct.select('statuses.id AS id, COUNT(status_reactions.*) as reaction_count').group('statuses.id').in_batches do |statuses|
      StatusStat.upsert_all(statuses.map { |status| { status_id: status.id, reactions_count: status.reaction_count } }, unique_by: :status_id)
    end
  end

  def down
    StatusStat.unscoped.where('reactions_count > 0').in_batches.update_all(reactions_count: 0)
  end
end
