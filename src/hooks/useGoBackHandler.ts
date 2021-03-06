import * as React from "react";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { BackHandler } from "react-native";

/**
 * @function
 * @param onGoBackCallback function which will be executed when ios swipe back action or
 * android back button is executed
 * @param deps array of dependencies which will be used in the useEffect hook of listeners
 */

export default function useGoBackHandler<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList & string,
>(
  onGoBackCallback: () => boolean | null | undefined,
  deps?: React.DependencyList,
) {
  const navigation = useNavigation<StackNavigationProp<ParamList, RouteName>>();

  React.useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", onGoBackCallback);
    navigation.addListener("gestureEnd", onGoBackCallback);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", onGoBackCallback);
      navigation.removeListener("gestureEnd", onGoBackCallback);
    };
  }, [navigation, onGoBackCallback, deps]);
}
