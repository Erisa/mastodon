# frozen_string_literal: true

class ValidateChangeHeaderDescriptionNonNullable < ActiveRecord::Migration[7.2]
  def up
    validate_check_constraint :accounts, name: 'accounts_header_description_null'
    change_column_null :accounts, :header_description, false
    remove_check_constraint :accounts, name: 'accounts_header_description_null'
  end

  def down
    add_check_constraint :accounts, 'header_description IS NOT NULL', name: 'accounts_header_description_null', validate: false
    change_column_null :accounts, :header_description, true
  end
end
