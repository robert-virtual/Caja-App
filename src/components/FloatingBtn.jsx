import { Pressable, StyleSheet } from "react-native";

export function FloatingBtn({ onPress, children, style = {} }) {

  return (
    <Pressable
      onPress={onPress}
      style={[styles.floatingbtn, style]}>
      {children}
    </Pressable>
  )
}
const styles = StyleSheet.create({
  floatingbtn: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    width: 50,
    height: 50,
    bottom: 50,
    right: 50,
    backgroundColor: "#0984e3",
    borderRadius: 25,
    padding: 10,
    shadowRadius: 15,
    shadowOpacity: 0.5,
    shadowColor: "gray",
    shadowOffset: {
      width: 5,
      height: 5
    }
  }
});
