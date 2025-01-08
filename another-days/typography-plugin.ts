import plugin from 'tailwindcss/plugin';

type FontWeight = 'regular' | 'medium' | 'semibold' | 'bold';

const typography: {
  type: 'title' | 'body';
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  fontWeights: FontWeight[];
}[] = [
  {
    type: 'title',
    fontSize: 44,
    lineHeight: 58,
    letterSpacing: -1.32,
    fontWeights: ['bold', 'semibold'],
  },
  {
    type: 'title',
    fontSize: 32,
    lineHeight: 42,
    letterSpacing: -0.64,
    fontWeights: ['bold', 'semibold'],
  },
  {
    type: 'title',
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: -0.48,
    fontWeights: ['bold', 'semibold'],
  },
  {
    type: 'title',
    fontSize: 20,
    lineHeight: 26,
    letterSpacing: -0.32,
    fontWeights: ['bold', 'semibold'],
  },
  {
    type: 'title',
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: -0.216,
    fontWeights: ['bold', 'semibold'],
  },
  {
    type: 'title',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.16,
    fontWeights: ['semibold', 'medium'],
  },
  {
    type: 'body',
    fontSize: 15,
    lineHeight: 24,
    letterSpacing: -0.15,
    fontWeights: ['semibold', 'medium', 'regular'],
  },
  {
    type: 'body',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0,
    fontWeights: ['semibold', 'medium', 'regular'],
  },
  {
    type: 'body',
    fontSize: 13,
    lineHeight: 20,
    letterSpacing: 0,
    fontWeights: ['semibold', 'medium', 'regular'],
  },
  {
    type: 'body',
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: 0.06,
    fontWeights: ['semibold', 'medium', 'regular'],
  },
];

const fontWeightMap = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} satisfies { [key in FontWeight]: number };

export default plugin(({ addUtilities }) => {
  const _typography = Object.fromEntries(
    typography.flatMap((item) => {
      return item.fontWeights.map((fontWeight) => [
        `.${item.type}-${item.fontSize}-${fontWeight}`,
        {
          fontSize: `${item.fontSize}px`,
          lineHeight: `${item.lineHeight}px`,
          letterSpacing: `${item.letterSpacing}px`,
          fontWeight: `${fontWeightMap[fontWeight]}`,
        },
      ]);
    }),
  );

  addUtilities(_typography);
});
