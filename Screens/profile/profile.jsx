import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getData, removeValue } from "../../utils/local";
import routers from "../../utils/routers";

export default function ProfileScreen() {
  let [user, setUser] = useState({});
  useEffect(() => {
    const fetchUserName = async () => {
      const name = await getData("name");
      const phone = await getData("phone");
      const email = await getData("email");

      if (name) setUser({ name, email, phone });
    };

    fetchUserName();
  });
  let navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=12" }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.role}>Mobile App Developer</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>About Me</Text>
        <Text style={styles.infoText}>
          Passionate Mobile App Developer with 2+ years of experience building
          cross-platform mobile apps using Flutter,React Native,Firebase, and
          modern UI design.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Details</Text>

        <View style={styles.detailRow}>
          <Ionicons name="mail-outline" size={20} color="#aaa" />
          <Text style={styles.detailText}>{user.email}</Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="call-outline" size={20} color="#aaa" />
          <Text style={styles.detailText}>+2{user.phone}</Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="location-outline" size={20} color="#aaa" />
          <Text style={styles.detailText}>Cairo, Egypt</Text>
        </View>
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity
          onPress={() => {
            removeValue("token").then(() => {
              navigation.navigate(routers.login);
            });
          }}
          style={[styles.button, styles.logoutBtn]}
        >
          <Ionicons name="log-out-outline" size={18} color="white" />
          <Text style={styles.btnText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1F29",
    paddingHorizontal: 20,
  },
  header: {
    alignItems: "center",
    marginVertical: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#6C63FF",
  },
  name: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 10,
  },
  role: {
    color: "#aaa",
    fontSize: 14,
  },
  infoBox: {
    backgroundColor: "#2A2A3D",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  infoTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  infoText: {
    color: "#ccc",
    lineHeight: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  detailText: {
    color: "#ccc",
    marginLeft: 10,
    fontSize: 15,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6C63FF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 5,
  },
  logoutBtn: {
    backgroundColor: "#FF5C5C",
  },
  btnText: {
    color: "white",
    fontSize: 15,
    marginLeft: 6,
    fontWeight: "600",
  },
});
