# Color Utils

## 사용

```js
import { colors } from "quasar";

const { getPaletteColor } = colors;

console.log(getPaletteColor("primary")); // '#1976d2'
console.log(getPaletteColor("red-2")); // '#ffcdd2'
```

## options

- `rgbToHex`: RGB/A 색상 객체(`{ r: [0-255], g: [0-255], b: [0-255}<, a: [0-100]>}`)를 문자열(`#RRGGBB<AA>`)로 HEX/A 표현으로 변환합니다. 원본 객체에 알파 채널이 있는 경우 출력에도 알파 채널이 표시됩니다.
- `hexToRgb`: HEX/A 색상 문자열(`#RRGGBB<AA>`)을 RGB/A 표현인 객체(`{ r: [0-255], g: [0-255], b: [0-255}<, a: [0-100]>}`)로 변환합니다. 원본 오브젝트에 알파 채널이 있으면 출력에도 알파 채널이 표시됩니다.
- `hsvToRgb`: Converts a HSV/A color Object (`{ h: [0-360], s: [0-100], v: [0-100}, a: [0-100]}`) to its RGB/A representation as an Object (`{ r: [0-255], g: [0-255], b: [0-255}<, a: [0-100]>}`). If Alpha channel is present in the original object it will be present also in the output.
- `rgbToHsv`: RGB/A 컬러 객체(`{ r: [0-255], g: [0-255], b: [0-255}<, a: [0-100]>}`)를 HSV/A 표현인 객체(`{ h: [0-360], s: [0-100], v: [0-100}, a: [0-100]}`)로 변환합니다. 원본 오브젝트에 알파 채널이 있는 경우 출력에도 알파 채널이 표시됩니다.
- `textToRgb`: HEX/A 색상 문자열(`#RRGGBB<AA>`) 또는 RGB/A 색상 문자열(`rgb(R, G, B<, A>)`)을 RGB/A로 표현된 객체(`{ r: [0-255], g: [0-255], b: [0-255}<, a: [0-100]>}`)로 변환합니다. 원본 오브젝트에 알파 채널이 있는 경우 출력에도 알파 채널이 표시됩니다.
- `lighten`: 색상을 밝게(퍼센트가 양수인 경우) 또는 어둡게(퍼센트가 음수인 경우) 지정합니다. HEX/A 문자열 또는 RGB/A 문자열을 색상으로 받아들이고 색상에 적용할 밝게/어두움의 퍼센트(0~100 또는 -100~0)를 받습니다. 계산된 색의 HEX 문자열 표현을 반환합니다.
- `luminosity`: 색상의 상대 휘도를 계산합니다. HEX/A 문자열, RGB/A 문자열 또는 RGB/A 객체를 색상으로 받아들입니다. 0과 1 사이의 값을 반환합니다.
- `brightness`: 색상의 색상 대비를 계산합니다. HEX/A 문자열, RGB/A 문자열 또는 RGB/A 객체를 색상으로 받습니다. 0에서 255 사이의 값을 반환합니다. 128 미만의 값은 어두운 색상으로 간주됩니다.
- `blend`: HEX/A 문자열 또는 RGB/A 객체를 fgColor / bgColor로 받습니다. fgColor의 알파 채널이 완전히 불투명하면 결과는 fgColor가 됩니다. bgColor의 알파 채널이 완전히 불투명하면 결과 혼합 색상도 불투명합니다. fgColor에 대한 입력과 동일한 유형을 반환합니다.
- `changeAlpha`: 문자열 색상의 알파를 증가시키거나 감소시킵니다.

색상으로 HEX/A 문자열을, 오프셋으로 -1에서 1 사이의 숫자(가장자리 포함)를 받습니다. 음수 값을 사용하면 알파가 감소하고 양수 값을 사용하면 알파가 증가합니다(예: `changeAlpha('#ff0000', -0.1)`는 알파를 10% 감소시킵니다). HEX/A 문자열을 반환합니다.
