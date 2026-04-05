# frozen_string_literal: true

require 'rails_helper'
require 'mastodon/cli/username_blocks'

RSpec.describe Mastodon::CLI::UsernameBlocks do
  subject { cli.invoke(action, arguments, options) }

  let(:cli) { described_class.new }
  let(:arguments) { [] }
  let(:options) { {} }

  it_behaves_like 'CLI Command'

  describe '#list' do
    let(:action) { :list }

    context 'with username block records' do
      let!(:block) { Fabricate(:username_block) }

      it 'lists all the blocks by default' do
        expect { subject }
          .to output_results(
            block.username
          )
      end
    end
  end

  describe '#add' do
    let(:action) { :add }

    context 'without any options' do
      it 'warns about usage and exits' do
        expect { subject }
          .to raise_error(Thor::Error, 'No username(s) given')
      end
    end

    context 'when blocks exist' do
      let(:options) { {} }
      let(:username) { 'example' }
      let(:arguments) { [username] }

      before { Fabricate(:username_block, username: username) }

      it 'does not add a new block' do
        expect { subject }
          .to output_results('is already blocked')
          .and(not_change(UsernameBlock, :count))
      end
    end

    context 'when no blocks exist' do
      let(:username) { 'example' }
      let(:arguments) { [username] }

      it 'adds a new block' do
        expect { subject }
          .to output_results('Added 1')
          .and(change(UsernameBlock, :count).by(1))
      end
    end
  end

  describe '#remove' do
    let(:action) { :remove }

    context 'without any options' do
      it 'warns about usage and exits' do
        expect { subject }
          .to raise_error(Thor::Error, 'No username(s) given')
      end
    end

    context 'when blocks exist' do
      let(:username) { 'example' }
      let(:arguments) { [username] }

      before { Fabricate(:username_block, username: username) }

      it 'removes the block' do
        expect { subject }
          .to output_results('Removed 1')
          .and(change(UsernameBlock, :count).by(-1))
      end
    end

    context 'when no blocks exist' do
      let(:username) { 'example' }
      let(:arguments) { [username] }

      it 'does not remove a block' do
        expect { subject }
          .to output_results('is not yet blocked')
          .and(not_change(UsernameBlock, :count))
      end
    end
  end
end
