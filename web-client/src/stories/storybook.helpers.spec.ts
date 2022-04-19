import { Meta } from '@storybook/angular';
import {
  DEFAULT_EXCLUDE_CONTROLS,
  ionicStoryMeta,
} from 'src/stories/storybook.helpers';

// These tests mainly cover the tricky augmenting edge cases.
describe('ionicStoryMeta', () => {
  type MockArgs = { ham: string; spam: string };

  type ComparableMeta<TArgs> = Omit<Meta<TArgs>, 'decorators'> & {
    decorators: Array<string>;
  };

  // Helper: Transform Meta to easily comparable form.
  const comparable = <TArgs>(meta: Meta<TArgs>): ComparableMeta<TArgs> => ({
    ...meta,
    decorators: (meta?.decorators ?? []).map((d) => d.name),
  });

  // The base expected result.
  const expected = {
    parameters: {
      layout: 'fullscreen',
      controls: { exclude: [...DEFAULT_EXCLUDE_CONTROLS] },
    },
    argTypes: {},
    decorators: ['', ''],
  };

  it('returns default expected', () => {
    expect(comparable(ionicStoryMeta<MockArgs>({}))).toEqual(expected);
  });

  it('augments parameters', () => {
    expect(
      comparable(
        ionicStoryMeta<MockArgs>({
          parameters: { layout: 'padded', foo: 'bar' },
        })
      )
    ).toEqual({
      ...expected,
      parameters: { ...expected.parameters, layout: 'padded', foo: 'bar' },
    });
  });

  it('augments parameters.controls', () => {
    expect(
      comparable(
        ionicStoryMeta<MockArgs>({ parameters: { controls: { foo: 'bar' } } })
      )
    ).toEqual({
      ...expected,
      parameters: {
        ...expected.parameters,
        controls: { ...expected.parameters.controls, foo: 'bar' },
      },
    });
  });

  it('augments parameters.controls.include', () => {
    expect(
      comparable(
        ionicStoryMeta<MockArgs>(
          { parameters: { controls: { include: ['foo'] } } },
          { controls: { shown: ['ham'] } }
        )
      )
    ).toEqual({
      ...expected,
      parameters: {
        ...expected.parameters,
        controls: { ...expected.parameters.controls, include: ['ham', 'foo'] },
      },
    });
  });

  it('augments parameters.controls.exclude', () => {
    expect(
      comparable(
        ionicStoryMeta<MockArgs>(
          {
            parameters: { controls: { exclude: ['foo'] } },
          },
          { controls: { hidden: ['spam'] } }
        )
      )
    ).toEqual({
      ...expected,
      parameters: {
        ...expected.parameters,
        controls: {
          exclude: [...expected.parameters.controls.exclude, 'spam', 'foo'],
        },
      },
    });
  });

  it('augments argTypes', () => {
    expect(
      comparable(
        ionicStoryMeta<MockArgs>({
          argTypes: { ham: { type: 'boolean' } },
        })
      )
    ).toEqual({
      ...expected,
      argTypes: { ham: { type: 'boolean' } },
    });
  });

  it('augments argTypes control', () => {
    expect(
      comparable(
        ionicStoryMeta<MockArgs>(
          {
            argTypes: { ham: { control: { spam: 'spam' } } },
          },
          { controls: { outputs: ['ham'] } }
        )
      )
    ).toEqual({
      ...expected,
      argTypes: { ham: { control: { type: null, spam: 'spam' } } },
    });
  });
});
