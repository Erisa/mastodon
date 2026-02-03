# frozen_string_literal: true

# This migration from upstream adds a column that we already had
class AddHeaderDescriptionToAccounts < ActiveRecord::Migration[8.0]
  def up
    change_column :accounts, :header_description, :string, null: false, default: ''
  end

  def down
    change_column :accounts, :header_description, :text, null: false, default: ''
  end
end
