import React, { useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Card, SizableText, YStack, Button, View, XStack } from 'tamagui';
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons';
import { useDispatch } from 'react-redux';
import { performAdd } from '../../../storage/actions/addUserField';
import { colorTokens } from '@tamagui/themes';
import { DateInput, IntegerInput, StringInput } from './InputSections';

const { height } = Dimensions.get('window');

const OnboardingCard = ({
  onboardingCard,
  scrollToPrev,
  scrollToNext,
  currentIndex,
}) => {
  const { datatype } = onboardingCard.inputConstraints;
  const [inputData, setInputData] = useState();
  const dispatch = useDispatch();

  const renderInputField = () => {
    switch (datatype) {
      case 'http://www.w3.org/2001/XMLSchema#string':
        return <StringInput setInputData={setInputData} />;
      case 'http://www.w3.org/2001/XMLSchema#integer':
        return <IntegerInput setInputData={setInputData} />; // Modify as needed to handle state properly
      case 'http://www.w3.org/2001/XMLSchema#date':
        return <DateInput setInputData={setInputData} />; // Modify as needed to handle state properly
      default:
        return <SizableText color={'black'}>Unsupported data type</SizableText>;
    }
  };

  return (
    <Card style={styles.fullScreenContainer}>
      <YStack
        flex={1}
        alignSelf={'center'}
        justifyContent={'space-between'}
        paddingVertical={60}
      >
        <XStack justifyContent={'center'}>
          {currentIndex > 0 ? (
            <Button
              icon={<ChevronUp size='$2' color={'black'} />}
              title='Prev'
              onPress={scrollToPrev}
              style={styles.navigationButton}
            />
          ) : (
            <View style={{ height: 60, width: 60 }} />
          )}
        </XStack>
        <YStack gap={30}>
          <SizableText style={styles.titleText}>
            {' '}
            {onboardingCard.title}{' '}
          </SizableText>
          {renderInputField()}
          <Button
            size='$4'
            onPress={() => {
              dispatch(performAdd(onboardingCard.datafield, inputData));
              scrollToNext();
            }}
            style={styles.addProfileFiledButton}
          >
            Add To Profile
          </Button>
        </YStack>
        <XStack justifyContent={'center'}>
          <Button
            icon={<ChevronDown size='$2' color={'black'} />}
            title='Next'
            onPress={scrollToNext}
            style={styles.navigationButton}
          />
        </XStack>
      </YStack>
    </Card>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    height: height,
    backgroundColor: 'white',
  },
  titleText: {
    fontSize: 24,
    color: 'black',
  },
  inputField: {
    height: 40,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  addProfileFiledButton: {
    fontSize: 16,
    fontWeight: 400,
    borderWidth: 0,
    backgroundColor: colorTokens.light.blue.blue8,
  },
  navigationButton: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: 'white',
  },
});

export default OnboardingCard;