# frozen_string_literal: true

# This migration from upstream adds a column that we already had
class AddAvatarDescriptionToAccounts < ActiveRecord::Migration[8.0]
  def up
    change_column :accounts, :avatar_description, :string, null: false, default: ''
  end

  def down
    change_column :accounts, :avatar_description, :text, null: false, default: ''
  end
end
