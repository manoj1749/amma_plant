import React, { Component } from "react";
import Swiper from "react-native-deck-swiper";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import serverURL from "../../../helpers/serverURL";
import moment from "moment";
// demo purposes only
function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}
const Card = () => {
  const { userImageDetails } = useSelector((state) => state.post);

  const [state, setState] = React.useState({
    cards: [...range(0, 0)],
    swipedAllCards: false,
    swipeDirection: "",
    cardIndex: 0,
  });
  console.log(userImageDetails, "user");
  const useSwiper = React.useRef();
  const renderCard = (card, index) => {
    const time = moment(card.createdAt);
    return (
      <View style={styles.card}>
        {userImageDetails.length > 0 ? (
          <>
            <Image
              style={{ flex: 1, borderRadius: 50 }}
              source={{ uri: `${serverURL()}/${card.imageUrl}` }}
            />
            <View
              style={{
                position: "absolute",
                bottom: 0,
                backgroundColor: "#00000080",
                width: "100%",
                height: 90,
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 50,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  padding: 5,
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 17, fontWeight: "700" }}
                >
                  Description:
                </Text>
                <Text style={{ color: "white", marginLeft: 2 }}>
                  {card.description}
                </Text>
              </View>
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  padding: 5,
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 17, fontWeight: "700" }}
                >
                  Date:
                </Text>
                <Text style={{ color: "white", marginLeft: 2 }}>
                  {time.format("DD/MM/YY HH:mm")}
                </Text>
              </View>
            </View>
          </>
        ) : (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={{ color: "black" }}>No images</Text>
          </View>
        )}
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
        cardStyle={{ backgroundColor: "#F6EBE7", width: "100%" }}
        onSwiped={() => onSwiped("general")}
        onSwipedLeft={() => onSwiped("left")}
        onSwipedRight={() => onSwiped("right")}
        onSwipedTop={() => onSwiped("top")}
        onSwipedBottom={() => onSwiped("bottom")}
        onTapCard={swipeLeft}
        cards={userImageDetails.length > 0 ? userImageDetails : state.cards}
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
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#F6EBE7",
            flex: 0.1,
          }}
          onPress={() => useSwiper.current.swipeBack()}
        >
          <Text
            style={{
              color: "black",
              fontSize: 15,
              fontWeight: 700,
              marginBottom: 5,
            }}
          >
            Back
          </Text>
        </TouchableOpacity>

        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <Text style={{ fontSize: 18, fontWeight: "800" }}>No Image</Text>
        </View>
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
    flex: 0.6,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white",
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent",
    position: "relative",
  },
  done: {
    textAlign: "center",
    fontSize: 30,
    color: "white",
    backgroundColor: "transparent",
  },
});
