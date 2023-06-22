import React, { Component } from "react";
import Swiper from "react-native-deck-swiper";
import { Button, StyleSheet, Text, View } from "react-native";

// demo purposes only
function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}
const Card = () => {
  const [state, setState] = React.useState({
    cards: [...range(1, 50)],
    swipedAllCards: false,
    swipeDirection: "",
    cardIndex: 0,
  });
  const useSwiper = React.useRef();
  const renderCard = (card, index) => {
    return (
      <View style={styles.card}>
        <Text style={styles.text}>image{index}</Text>
      </View>
    );
  };

  const onSwiped = (type) => {
    console.log(`on swiped ${type}`);
  };

  const onSwipedAllCards = () => {
    setState((prev) => ({
      ...prev,
      swipedAllCards: true,
    }));
  };

  const swipeLeft = () => {
    console.log("hello", useSwiper);
    useSwiper.current.swipeLeft();
  };
  return (
    <View style={styles.container}>
      <Swiper
        ref={useSwiper}
        cardStyle={{ backgroundColor: "salmon", width: "100%" }}
        onSwiped={() => onSwiped("general")}
        onSwipedLeft={() => onSwiped("left")}
        onSwipedRight={() => onSwiped("right")}
        onSwipedTop={() => onSwiped("top")}
        onSwipedBottom={() => onSwiped("bottom")}
        onTapCard={swipeLeft}
        cards={state.cards}
        cardIndex={state.cardIndex}
        cardVerticalMargin={35}
        cardHorizontalMargin={0}
        renderCard={renderCard}
        onSwipedAll={onSwipedAllCards}
        stackSize={3}
        stackSeparation={15}
        overlayLabels={
          {
            //   bottom: {
            //     title: "BLEAH",
            //     style: {
            //       label: {
            //         backgroundColor: "black",
            //         borderColor: "black",
            //         color: "white",
            //         borderWidth: 1,
            //       },
            //       wrapper: {
            //         flexDirection: "column",
            //         alignItems: "center",
            //         justifyContent: "center",
            //       },
            //     },
            //   },
            // left: {
            //   title: "NOPE",
            //   style: {
            //     label: {
            //       backgroundColor: "black",
            //       borderColor: "black",
            //       color: "white",
            //       borderWidth: 1,
            //     },
            //     wrapper: {
            //       flexDirection: "column",
            //       alignItems: "flex-end",
            //       justifyContent: "flex-start",
            //       marginTop: 30,
            //       marginLeft: -30,
            //     },
            //   },
            // },
            // right: {
            //   title: "LIKE",
            //   style: {
            //     label: {
            //       backgroundColor: "black",
            //       borderColor: "black",
            //       color: "white",
            //       borderWidth: 1,
            //     },
            //     wrapper: {
            //       flexDirection: "column",
            //       alignItems: "flex-start",
            //       justifyContent: "flex-start",
            //       marginTop: 30,
            //       marginLeft: 30,
            //     },
            //   },
            // },
            //   top: {
            //     title: "SUPER LIKE",
            //     style: {
            //       label: {
            //         backgroundColor: "black",
            //         borderColor: "black",
            //         color: "white",
            //         borderWidth: 1,
            //       },
            //       wrapper: {
            //         flexDirection: "column",
            //         alignItems: "center",
            //         justifyContent: "center",
            //       },
            //     },
            //   },
          }
        }
        // animateOverlayLabelsOpacity
        // animateCardOpacity
        swipeBackCard
      >
        <Button
          color={"salmon"}
          onPress={() => useSwiper.current.swipeBack()}
          title="Swipe Back"
          style={{ color: "red" }}
        />
      </Swiper>
    </View>
  );
};
export default Card;

const styles = StyleSheet.create({
  container: {
    flex: 0.7,
    backgroundColor: "salmon",
    overflow: "hidden",
    borderRadius: 50,
  },
  card: {
    flex: 0.5,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    // justifyContent: "center",
    backgroundColor: "white",
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent",
  },
  done: {
    textAlign: "center",
    fontSize: 30,
    color: "white",
    backgroundColor: "transparent",
  },
});
