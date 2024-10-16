import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../services/api'; // Importing the Axios instance

const ReviewForm = ({ bookId }) => {
  // Yup validation schema for the form
  const validationSchema = Yup.object({
    rating: Yup.number()
      .required('Rating is required')
      .min(1, 'Rating must be at least 1')
      .max(5, 'Rating can’t be more than 5'),
    comment: Yup.string().required('Comment is required'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Making POST request to add a review
      await api.post(`/books/${bookId}/reviews`, values);
      alert('Review submitted successfully!');
      resetForm();
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit the review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ rating: '', comment: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="rating">Rating</label>
            <Field as="select" name="rating">
              <option value="" label="Select rating" />
              {[1, 2, 3, 4, 5].map((rate) => (
                <option key={rate} value={rate} label={`${rate}`} />
              ))}
            </Field>
            <ErrorMessage name="rating" component="div" />
          </div>

          <div>
            <label htmlFor="comment">Comment</label>
            <Field as="textarea" name="comment" />
            <ErrorMessage name="comment" component="div" />
          </div>

          <button type="submit" disabled={isSubmitting}>
            Submit Review
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ReviewForm;