import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import routers from "../../utils/routers";
import { useNavigation } from "@react-navigation/native";
import AnimationAuth from "../../components/animations/authAnimation";
import animation from "../../assets/animations/register.json";
import { handleRegister } from "../../apis/handleApis";
import { useToast } from "react-native-toast-notifications";
import { storeData } from "../../utils/local";

const LoginSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be more than 2 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be more than 6 characters")
    .required("Password is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone must contain only numbers")
    .length(11, "Phone must be exactly 11 digits")
    .required("Phone is required"),
});

export default function Register() {
  const toast = useToast();

  const navigate = useNavigation();
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ width: "85%" }}>
          <Text style={styles.mainText}>
            Join our community — it only takes a minute!
          </Text>
        </View>
        <AnimationAuth animation={animation} loop={true} />
        <Formik
          validationSchema={LoginSchema}
          initialValues={{ email: "", password: "", name: "", phone: "" }}
          onSubmit={async (values) => {
            try {
              let response = await handleRegister({
                name: values.name,
                email: values.email,
                gender: 0,
                password: values.password,
                password_confirmation: values.password,
                phone: values.phone,
              });
              toast.show(response.message, {
                type: "success",
                duration: 4000,
                animationType: "zoom-in",
              });
              console.error(values.phone);

              await storeData("phone", values.phone);
              await storeData("email", values.email);
              navigate.navigate(routers.login);
            } catch (error) {
              let errorMessage = error.response.data;

              console.error("Registration failed:", errorMessage);
              if (errorMessage.data.email && errorMessage.data.phone) {
                toast.show(
                  ` ${errorMessage.data.email[0]} and ${errorMessage.data.phone[0]}`,
                  {
                    type: "danger",
                    duration: 4000,
                    animationType: "zoom-in",
                  }
                );
              } else if (errorMessage.data.email) {
                toast.show(errorMessage.data.email[0], {
                  type: "danger",
                  duration: 4000,
                  animationType: "zoom-in",
                });
              } else if (errorMessage.data.phone) {
                toast.show(errorMessage.data.phone[0], {
                  type: "danger",
                  duration: 4000,
                  animationType: "zoom-in",
                });
              } else {
                toast.show("Somthing Error Try Again Later", {
                  type: "danger",
                  duration: 4000,
                  animationType: "zoom-in",
                });
              }
            }
          }}
        >
          {({
            handleBlur,
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.form}>
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: errors.password ? "red" : "white",
                  },
                ]}
                placeholder="Email"
                placeholderTextColor="#999"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}

              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: errors.password ? "red" : "white",
                  },
                ]}
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}

              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: errors.name ? "red" : "white",
                  },
                ]}
                placeholder="name"
                placeholderTextColor="#999"
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
              />
              {touched.name && errors.name && (
                <Text style={styles.error}>{errors.name}</Text>
              )}

              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: errors.phone ? "red" : "white",
                  },
                ]}
                placeholder="Phone"
                placeholderTextColor="#999"
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
                value={values.phone}
              />
              {touched.phone && errors.phone && (
                <Text style={styles.error}>{errors.phone}</Text>
              )}

              <Pressable onPress={handleSubmit} style={styles.preesable}>
                <Text style={styles.submit}>Register Now</Text>
              </Pressable>
            </View>
          )}
        </Formik>
        <View
          style={{
            width: "100%",
            marginTop: "20",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Text style={{ color: "white" }}>Already Have Account ?</Text>
          <TouchableOpacity onPress={() => navigate.navigate(routers.login)}>
            <Text style={{ color: "grey" }}> Log IN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1F29",
    alignItems: "center",
    justifyContent: "start",
    paddingVertical: 90,
  },
  mainText: {
    color: "white",
    fontSize: 20,
    marginBottom: 5,
  },
  secondText: {
    color: "grey",
    fontSize: 15,
    marginBottom: 5,
  },
  form: {
    marginTop: 20,
    width: "90%",
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    color: "white",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  preesable: {
    backgroundColor: "white",
    width: "80%",
    borderColor: "none",
    marginTop: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    margin: "auto",
    marginTop: 10,
  },
  submit: {
    color: "#1F1F29",
    textAlign: "center",
    fontWeight: "bold",
  },
});
