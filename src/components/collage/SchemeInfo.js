import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../../assets/styles/colors';
import {fontColors, fontSizes, fontWeights} from '../../assets/styles/fonts';
import TextBoxHeader from '../generic/TextBoxHeader';

const SchemeInfo = ({data}) => {
  return (
    <View>
      <View style={styles.imagePlaceholder}>
        <Text style={styles.imagePlaceholderTitle}>Image Placeholder</Text>
      </View>
      <TextBoxHeader title={data.title} text={data.description_long} />
      <TextBoxHeader title={data.title} text={data.description_long} />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePlaceholder: {
    height: 200,
    backgroundColor: colors.red,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: 16,
    borderRadius: 5,
  },
  imagePlaceholderTitle: {
    fontSize: fontSizes.large,
    fontWeight: fontWeights.bold,
    color: fontColors.tertiary,
  },
});

export default SchemeInfo;
