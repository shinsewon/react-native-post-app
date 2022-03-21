import React, {forwardRef} from 'react';
import {TextInput, StyleSheet} from 'react-native';

function BorderedInput({hasMarginBottom, ...rest}, ref) {
  return (
    <TextInput
      ref={ref}
      style={[styles.input, hasMarginBottom && styles.margin]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: '#bdbdbd',
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 4,
    height: 48,
    backgroundColor: '#fff',
  },
  margin: {
    marginBottom: 16,
  },
});

export default forwardRef(BorderedInput);
