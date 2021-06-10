import { useState, useCallback } from 'react';

const useFormValidation = (data)=> {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');


  const handleChange = (event) => {
    event.target.id === "name"? setName(event.target.value): setEmail(event.target.value);

    const target = event.target;
    const name = target.name;
    const value = target.value;

    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false, newName = "", newEmail="") => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
      setName(newName);
      setEmail(newEmail)
    },
    [setValues, setErrors, setIsValid,setName, setEmail]
  );
  return { values, handleChange, errors, isValid, resetForm, name, email};
}
export default useFormValidation;