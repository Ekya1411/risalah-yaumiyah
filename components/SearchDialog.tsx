import React, { Component } from "react";
import { StyleSheet, TextInput } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {
  View,
  Text,
  Incubator,
  Spacings,
  ModalProps,
  PanningProvider,
} from "react-native-ui-lib";
import { router, useRouter } from 'expo-router';
// import { saveRecentlyOpened, getRecentlyOpened } from '../modules/recentlyOpenedModule';
import { getContentById, getContents, Content } from '../modules/contentModule';

export default class IncubatorDialogScreen extends Component {
  state = {
    visible: false,
    searchText: "",
  };
  
  modalProps: ModalProps = { supportedOrientations: ["portrait", "landscape"] };
  

  handleMoreItemsSelect = async (id: number) => {
    try {
      const content = getContentById(id);
      if (content) {
        // setRecentlyOpened(updatedItems);
        this.closeDialog();
        router.push(`reader/${id}`);
      }
    } catch (error) {
      console.error("Error handling more items selection:", error);
    }
  };

  renderVerticalItem = ({ item }: { item: Content }) => {
    return (
      <Text
        text50
        marginH-s5
        marginV-s2
        onPress={() => this.handleMoreItemsSelect(item.id)}
      >
        {item.title}
      </Text>
    );
  };

  keyExtractor = (item: Content) => {
    return item.id.toString();
  };

  openDialog = () => {
    this.setState({ visible: true });
  };

  closeDialog = () => {
    this.setState({ visible: false });
  };

  onDismiss = () => {
    this.setState({ visible: false });
  };

  handleSearchTextChange = (text: string) => {
    this.setState({ searchText: text });
  };

  getFilteredTitles = () => {
    const { searchText } = this.state;
    const contents = getContents(); // Get all contents

    if (!searchText) return contents;

    return contents.filter(item =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
    );
  };
  
  render() {
    const { visible, searchText } = this.state;

    return (
      <View>
        <Incubator.Dialog
          useSafeArea
          visible={visible}
          onDismiss={this.onDismiss}
          top
          centerH
          modalProps={this.modalProps}
          direction={PanningProvider.Directions.UP}
          width={"100%"}
        >
          <View>
            <TextInput
              style={styles.SearchBox}
              placeholder="Enter text here"
              value={searchText}
              onChangeText={this.handleSearchTextChange}
            />
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.verticalScroll}
            data={this.getFilteredTitles()}
            renderItem={this.renderVerticalItem}
            keyExtractor={this.keyExtractor}
          />
        </Incubator.Dialog>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  verticalScroll: {
    paddingVertical: Spacings.s2,
  },
  SearchBox: {
    width: "90%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    fontSize: 16,
    alignSelf: "center",
  },
});
