import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  age: Yup.number()
    .required("Age is required")
    .positive("Age must be positive"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

export default function Forms(props) {
  const [addedEmails, setAddedEmails] = useState([]);

  const handleSubmit = (values, { setFieldError, resetForm }) => {
    if (addedEmails.includes(values.email)) {
      setFieldError("email", "Email already exists");
      return;
    }

    setAddedEmails((prev) => [...prev, values.email]);

    props.setData((prev) => [...prev, values]);

    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: "", age: "", email: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <Field name="name" type="text" className="form-control" />
          <ErrorMessage name="name" component="div" className="text-danger" />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <Field name="age" type="number" className="form-control" />
          <ErrorMessage name="age" component="div" className="text-danger" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <Field name="email" type="email" className="form-control" />
          <ErrorMessage name="email" component="div" className="text-danger" />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </Form>
    </Formik>
  );
}
