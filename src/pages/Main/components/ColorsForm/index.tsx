import { FC, useEffect } from 'react';
import { useFormik } from 'formik';
import * as ST from './styled';
import { ColorInputs } from '@pages/Main/components/ColorInputs';
import { convertColor, rgbToCmyk, rgbToHsl, rgbToHsv, rgbToLab, rgbToYcc } from '@src/utils/colors';
import { ColorModel, ImageColor } from '@src/providers/ImageContextProvider';

type FormType = {
  rgb: {
    r: number;
    g: number;
    b: number;
  };
  cmyk: {
    c: number;
    m: number;
    y: number;
    k: number;
  };
  hsv: {
    h: number;
    s: number;
    v: number;
  };
  hsl: {
    h: number;
    s: number;
    l: number;
  };
  lab: {
    l: number;
    a: number;
    b: number;
  };
  ycc: {
    y: number;
    cb: number;
    cr: number;
  }
}

type Props = {
  color: ImageColor;
}

export const ColorsForm: FC<Props> = ({ color }) => {
  const { r, g, b } = color;
  const formik = useFormik<FormType>({
    initialValues: {
      rgb: {
        r, g, b,
      },
      cmyk: rgbToCmyk(r, g, b),
      hsl: rgbToHsl(r, g, b),
      hsv: rgbToHsv(r, g, b),
      lab: rgbToLab(r, g, b),
      ycc: rgbToYcc(r, g, b),
    },
    onSubmit: (values) => {
      console.log(values);
    }
  });

  useEffect(() => {
    formik.setValues({
      rgb: {
        r, g, b,
      },
      cmyk: rgbToCmyk(r, g, b),
      hsl: rgbToHsl(r, g, b),
      hsv: rgbToHsv(r, g, b),
      lab: rgbToLab(r, g, b),
      ycc: rgbToYcc(r, g, b),
    })
  }, [color]);

  const handleConvert = (from: ColorModel) => () => {
    switch (from) {
      case ColorModel.CMYK:
        const valuesCmyk = convertColor({ cmyk: Object.values(formik.values.cmyk) });
        if (valuesCmyk) {
          formik.setValues(valuesCmyk);
        }
        break;
      case ColorModel.HSL:
        const valuesHsl = convertColor({ hsl: Object.values(formik.values.hsl) });
        if (valuesHsl) {
          formik.setValues(valuesHsl);
        }
        break;
      case ColorModel.LAB:
        const valuesLab = convertColor({ lab: Object.values(formik.values.lab) });
        if (valuesLab) {
          formik.setValues(valuesLab);
        }
        break;
      case ColorModel.RGB:
        const valuesRgb = convertColor({ rgb: Object.values(formik.values.rgb) });
        if (valuesRgb) {
          formik.setValues(valuesRgb);
        }
        break;
      case ColorModel.HSV:
        const valuesHsv = convertColor({ hsv: Object.values(formik.values.hsv) });
        if (valuesHsv) {
          formik.setValues(valuesHsv);
        }
        break;
      case ColorModel.YCbCr:
        const valuesYcc = convertColor({ ycc: Object.values(formik.values.ycc) });
        if (valuesYcc) {
          formik.setValues(valuesYcc);
        }
        break;
    }
  }

  const handleChange = (from: ColorModel) => (name: string, value: string) => {
    switch (from) {
      case ColorModel.CMYK:
        formik.setFieldValue(`cmyk.${name}`, value);
        break;
      case ColorModel.HSL:
        formik.setFieldValue(`hsl.${name}`, value);
        break;
      case ColorModel.LAB:
        formik.setFieldValue(`lab.${name}`, value);
        break;
      case ColorModel.RGB:
        formik.setFieldValue(`rgb.${name}`, value);
        break;
      case ColorModel.HSV:
        formik.setFieldValue(`hsv.${name}`, value);
        break;
      case ColorModel.YCbCr:
        formik.setFieldValue(`ycc.${name}`, value);
        break;
    }
  }

  return (
    <ST.Wrapper>
      <ST.ColorInfo>
        <ST.ColorSquare color={`rgb(${formik.values.rgb.r},${formik.values.rgb.g},${formik.values.rgb.b})`} />
      </ST.ColorInfo>

      <ColorInputs
        names={['r', 'g', 'b']}
        values={formik.values.rgb}
        onConvert={handleConvert(ColorModel.RGB)}
        onChange={handleChange(ColorModel.RGB)}
      />
      <ColorInputs
        names={['c', 'm', 'y', 'k']}
        values={formik.values.cmyk}
        onConvert={handleConvert(ColorModel.CMYK)}
        onChange={handleChange(ColorModel.CMYK)}
      />
      <ColorInputs
        names={['h', 's', 'v']}
        values={formik.values.hsv}
        onConvert={handleConvert(ColorModel.HSV)}
        onChange={handleChange(ColorModel.HSV)}
      />
      <ColorInputs
        names={['h', 's', 'l']}
        values={formik.values.hsl}
        onConvert={handleConvert(ColorModel.HSL)}
        onChange={handleChange(ColorModel.HSL)}
      />
      <ColorInputs
        names={['l', 'a', 'b']}
        values={formik.values.lab}
        onConvert={handleConvert(ColorModel.LAB)}
        onChange={handleChange(ColorModel.LAB)}
      />
      <ColorInputs
        names={['y', 'cb', 'cr']}
        values={formik.values.ycc}
        onConvert={handleConvert(ColorModel.YCbCr)}
        onChange={handleChange(ColorModel.YCbCr)}
      />
    </ST.Wrapper>
  );
}
