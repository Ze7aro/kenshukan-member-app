import React from 'react'
import { Button, Text, View, StyleSheet } from 'react-native'
import StyledTextInput from '../StyledTextInput'
import { Formik, useField } from 'formik'
import { loginSchema } from '../validationSchema/login'


const styles = StyleSheet.create({
    error: {
        color: 'red',
        fontSize: 12,
        marginBottom: 10,
        marginLeft: 10
    }
})

const FormikInputValue = ({name, ...props}) => {
    const [field, meta, helpers ] = useField(name)
    return (
        <>
        <StyledTextInput error={ meta.error} value={field.value} onChangeText={value => helpers.setValue(value)} {...props}/>
        {meta.error && <Text style={styles.error}>{meta.error}</Text>}
        </>
    )
}

const Login = () => {
    const initialValues = {
        email: '', 
        password: '',
    }
  return (
    <Formik initialValues={initialValues} onSubmit={values => console.log(values)} validationSchema={loginSchema}>
        {({ handleSubmit}) => (
            <View>
                <Text>Email</Text>
                <FormikInputValue name="email" placeholder='Email' />
                <Text>Password</Text>
                <FormikInputValue name="password" placeholder='Password' secureTextEntry/>
                <Button
          title="Login"
          onPress={handleSubmit}
        />
            </View>
        )}
    </Formik>
  )
}

export default Login