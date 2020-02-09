import babel from 'rollup-plugin-babel';

export default {
  input: "src/useCombobox.js",
  external: ["react"],
  output: [
    {
      file: "dist/react-hook-combobox.cjs.js",
      format: "cjs",
    },
    {
      file: "dist/react-hook-combobox.esm.js",
      format: "esm",
    }
  ],
  plugins: [babel({
		comments: false
	})]
};
