# frozen_string_literal: true

class ValidateChangeAvatarDescriptionNonNullable < ActiveRecord::Migration[7.2]
  def up
    validate_check_constraint :accounts, name: 'accounts_avatar_description_null'
    change_column_null :accounts, :avatar_description, false
    remove_check_constraint :accounts, name: 'accounts_avatar_description_null'
  end

  def down
    add_check_constraint :accounts, 'avatar_description IS NOT NULL', name: 'accounts_avatar_description_null', validate: false
    change_column_null :accounts, :avatar_description, true
  end
end
