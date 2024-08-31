import React, { createRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors, Typography } from 'react-native-ui-lib';
import SearchDialog from './SearchDialog'; // Ensure correct path and casing

const Header: React.FC<{ title: string }> = ({ title }) => {
    const searchDialogRef = createRef<SearchDialog>();

    const openDialog = () => {
        searchDialogRef.current?.openDialog();
    };

    return (
        <>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{title}</Text>
                {title === "Beranda" && (
                    <Icon name="search" size={30} color={Colors.black} onPress={openDialog} />
                )}
            </View>
            <View>
                {/* Attach the ref to the SearchDialog component */}
                <SearchDialog ref={searchDialogRef} />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 20,
    },
    headerTitle: {
        ...Typography.text40,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    dialog: {
        flex: 1,
    },
});

export default Header;