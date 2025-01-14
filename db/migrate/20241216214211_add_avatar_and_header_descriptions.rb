# frozen_string_literal: true

class AddAvatarAndHeaderDescriptions < ActiveRecord::Migration[7.2]
  def change
    add_column :accounts, :avatar_description, :text, null: true
    add_column :accounts, :header_description, :text, null: true
  end
end
