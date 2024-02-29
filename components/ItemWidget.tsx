import { Text, View, Pressable , TextInput, StyleSheet, Modal} from "react-native"
import React, { useState } from 'react'; 
import { Item } from '../src/API';
import DeleteIcon from '../assets/icons/DeleteIcon';
import { Calendar } from "react-native-calendars";

interface Props extends Item {
    deleteHandler: (item:any) => void;
    editHandler: (item:any) => void;
}

const ItemWidget = ({__typename = "Item",name, exp_date, category, calories, quantity, deleteHandler, editHandler}: Props) => {
    const [editMode, setEditMode] = useState(false);
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [editedName, setEditedName] = useState(name);
    const [editedExpDate, setEditedExpDate] = useState(exp_date ? exp_date : 0);
    const [editedCategory, setEditedCategory] = useState(category ? category : "");
    const [editedQuantity, setEditedQuantity] = useState(quantity ? quantity.toString() : "");
    const [editedCalories, setEditedCalories] = useState(calories ? calories : "");

    const handleCancel = () => {
        setEditMode(false);
        setEditedName(name);
        setEditedQuantity(quantity ? quantity.toString() : "");
        setEditedExpDate(exp_date ?? 0);
    }

    const handleSave = () => {
        // Convert editedExpDate back to timestamp if necessary
        // const date = new Date(editedExpDate.year, editedExpDate.month - 1, editedExpDate.day);
        // const timestamp = date.getTime() / 1000; /
        // const expDateTimestamp = editedExpDate ? new Date(editedExpDate).getTime() / 1000 : null;
        
        editHandler({
            name: editedName,
            quantity: parseInt(editedQuantity, 10),
            exp_date: editedExpDate,
        });
        setEditMode(false);
        setEditedName(editedName);
        setEditedQuantity(editedQuantity);
        setEditedExpDate(editedExpDate ? editedExpDate : 0);
    };

    return (<>
            {editMode ? (
                <>
                    <Modal
                        transparent={true}
                        visible={calendarOpen}
                        onRequestClose={() => setCalendarOpen(false)}
                        style={styles.modal}
                    >
                        <Calendar
                            style={styles.calendar} 
                            // onDayPress={(e) => {setDate(new Date(e.dateString).getTime() / 1000); setOpen(false); }}
                            onDayPress={(day) => {
                                const date = new Date(day.year, day.month - 1, day.day);
                                const timestamp = date.getTime() / 1000; // Convert milliseconds to seconds
                                setEditedExpDate(timestamp);
                                setCalendarOpen(false);
                            }}
                        />

                        <Pressable onPress={() => setCalendarOpen(false)} style={styles.modalBackground}></Pressable>
                    </Modal>
                <View style={{...(styles.container), opacity: 0.5}}>
                    <View style={styles.info}>
                        <TextInput
                            style={styles.name}
                            onChangeText={setEditedName}
                            value={editedName ? (editedName) : ""}
                            inputMode="text"
                        />
                        {/* <View style={styles.wrapper}>
                            <Text>Expires: </Text>
                            <TextInput
                                placeholder="Add Date"
                                onChangeText={setEditedExpDate}
                                value={editedExpDate}
                            />
                        </View> */}
                        <View style={styles.wrapper}>
                            <Text style={styles.label}>Expiration Date:</Text>
                            <Pressable onPress={() => setCalendarOpen(!calendarOpen)} >
                                <Text style={styles.input}>
                                    {/* {date != 0 ? new Date(date * 1000).toLocaleDateString("en-US") : "Add Date"} */}
                                    {editedExpDate != 0 ? new Date(editedExpDate * 1000).toLocaleDateString("en-US") : "Add Date"}
                                </Text>
                            </Pressable>
                        </View>
                        <View style={styles.wrapper}>
                            <Text>Category: </Text>
                            <TextInput
                                placeholder="Add Category"
                                onChangeText={setEditedCategory}
                                value={editedCategory}
                                inputMode="text"
                            />
                        </View>
                        <View style={styles.wrapper}>
                            <Text>Quantity: </Text>
                            <TextInput
                                placeholder="1"
                                onChangeText={setEditedQuantity}
                                value={editedQuantity}
                                inputMode="numeric"
                            />
                        </View>
                        <View style={styles.wrapper}>
                            <Text>Calories: </Text>
                            <TextInput
                                placeholder="0"
                                onChangeText={setEditedCalories}
                                value={editedCalories}
                                inputMode="numeric"
                            />
                        </View>
                    </View>
                    <View style={styles.buttonsContainer}>
                        <Pressable onPress={handleSave}>
                            <Text>Save</Text>
                        </Pressable>
                        <Pressable onPress={handleCancel}>
                            <Text>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
                </>
            ) : (
                <View style={styles.container}>
                    <View style={styles.info}>                
                        <Text numberOfLines={1} style={styles.name}>{name}</Text>
                        {exp_date != 0 && exp_date != null && <Text style={styles.date}>Expires: {new Date(exp_date * 1000).toLocaleDateString("en-US")}</Text>}
                        {category != '' && category != null && <Text style={styles.category}>Category: {category}</Text>}
                        {quantity != 0 && quantity != null && <Text style={styles.quantity}>Quantity: {quantity}</Text>}
                        {calories != '' && calories != null &&  <Text style={styles.calories}>Calories: {calories}</Text>}
                    </View>

                    <View style={styles.buttonsContainer}>
                        <Pressable onPress={deleteHandler} style={styles.button}>
                            <Text>Delete</Text>
                            {/* <XIcon /> */}
                        </Pressable>
                        <Pressable onPress={() => setEditMode(true)} style={styles.button}>
                            <Text>Edit</Text>
                        </Pressable>
                    </View>
                </View>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'lightgray',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8,
        marginVertical: 2,
        // flexShrink: 1
    },
    editInput: {
    },
    name: {
        verticalAlign: 'middle',
        fontSize: 24,
        width: '100%',
    },
    quantity: {
    },
    date: {
    },
    category: {
   
    },
    calories: {
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        fontSize: 18,
    },
    info: {
        // display: 'flex',
        // flexDirection: 'column',
        flexShrink: 1,
        flexGrow: 1,
    },
    input: {
        // height: '100%',
        // verticalAlign: 'middle',
        fontSize: 16,
        // flexGrow: 1,       
    },
    label: {
        paddingRight: 8,
        verticalAlign: 'middle',
        // backgroundColor: 'green',
        fontSize: 16,
    },
    button: {
        // backgroundColor: 'lightblue',
        borderRadius: 10
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        // backgroundColor: 'red',
    },
    modal: {
        margin: 10,
    },
    modalBackground: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    calendar: {
        // height: 500,
        // backgroundColor: 'red',
        // width: '95%',
        marginHorizontal: '2.5%',
        marginTop: '40%',
        zIndex: 100,
        borderRadius: 16,
        padding: 16,
    }
})

export default ItemWidget