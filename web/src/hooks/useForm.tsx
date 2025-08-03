interface useFormProps<T> {
  setState: React.Dispatch<React.SetStateAction<T>>;
}

const useForm = <T,>(props: useFormProps<T>) => {
  const handleFormFieldChange = (e: any) => {
    props.setState((previousState: T) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  return {
    handleFormFieldChange,
  };
};

export default useForm;
