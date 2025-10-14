import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import AnimationAuth from "../../../components/animations/authAnimation";
import { useNavigation } from "@react-navigation/native";
import routers from "../../../utils/routers";
import animation from "../../../assets/animations/Login.json";
import { useToast } from "react-native-toast-notifications";
import { handleLogin } from "../../../apis/handleApis";
import { storeData } from "../../../utils/local";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Enter Valid Email").required("Email Required"),
  password: Yup.string()
    .min(6, "Must Be More Than 6 char")
    .required("Password Required"),
});

export default function Logins() {
  const toast = useToast();

  const navigate = useNavigation();
  return (
    <View style={styles.container}>
      <View style={{ width: "85%" }}>
        <Text style={styles.mainText}>Welcome Back Sir,</Text>
        <Text style={styles.secondText}>Log in to continue</Text>
      </View>
      <AnimationAuth animation={animation} loop={false} />
      <Formik
        validationSchema={LoginSchema}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            let response = await handleLogin({
              email: values.email,
              password: values.password,
            });
            toast.show(response.message, {
              type: "success",
              duration: 4000,
              animationType: "zoom-in",
            });
            console.error(response.data.token);
            console.error(response.data.username);

            await storeData("token", response.data.token);
            await storeData("name", response.data.username);
            navigate.navigate(routers.home);
          } catch (error) {
            let mainError = error.response.data.message;
            console.error(mainError);
            toast.show(mainError, {
              type: "danger",
              duration: 4000,
              animationType: "zoom-in",
            });
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

            <Pressable onPress={handleSubmit} style={styles.preesable}>
              <Text style={styles.submit}>Log In</Text>
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
        <Text style={{ color: "white" }}>Doesn't Have Any Account ?</Text>
        <TouchableOpacity onPress={() => navigate.navigate(routers.register)}>
          <Text style={{ color: "grey" }}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    marginBottom: 30,
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
