const inputHeight = 80;

export default function TextField(theme) {
  return {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label": {
            "&.MuiInputLabel-outlined": {
              // color: Colors.BlackHeadings,
              transform: "none",
              position: "relative",
              // fontWeight: Weights.semiBold,
              fontSize: "13px",
              lineHeight: "24px",
            },
          },
          "& .MuiOutlinedInput-notchedOutline": {
            top: 0,
            // borderColor: Colors.NonHoverBorder,
            "& legend": {
              display: "none",
            },
          },
          "& .MuiOutlinedInput-root": {
            // background: Colors.white,
            borderRadius: "5px",
            // color: Colors.BlackHeadings,
            "& .MuiInputBase-input": {
              padding: "12px 14px",
            },
            "&.Mui-focused fieldset": {
              borderWidth: "1px",
            },
            "&:not(.MuiOutlinedInput-multiline)": {
              height: `${inputHeight}px`,
              "&.MuiAutocomplete-inputRoot": {
                height: "auto",
                minHeight: `${inputHeight}px`,
              },
            },
            "&.Mui-disabled": {
              // color: Colors.GraySmall,
              "& .MuiOutlinedInput-notchedOutline": {
                // borderColor: Colors.NonHoverBorder,
              },
            },
          },
        },
      },
    },
  };
}
