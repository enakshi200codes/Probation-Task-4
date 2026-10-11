import React, { useState } from "react";
import { useCatalog } from "../../context/CatalogContext";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { formatDate } from "../../utils/format";
import Rating from "../ui/Rating";
import Button from "../ui/Button";
import InputField from "../ui/InputField";
import styles from "./ProductReviews.module.css";

export default function ProductReviews({ productId }) {
  const { getReviewsForProduct, addReview } = useCatalog();
  const { isAuthenticated, user } = useAuth();
  const { showToast } = useToast();
  
  const reviews = getReviewsForProduct(productId);
  const [isWriting, setIsWriting] = useState(false);
  
  const [formData, setFormData] = useState({ rating: "5", title: "", body: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Review title is required.";
    if (!formData.body.trim()) newErrors.body = "Review body is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      showToast("Please log in to leave a review.", { type: "info" });
      return;
    }
    if (!validate()) return;
    
    addReview({
      productId,
      author: `${user.firstName} ${user.lastName.charAt(0)}.`,
      rating: Number(formData.rating),
      title: formData.title,
      body: formData.body
    });
    
    showToast("Review submitted successfully.", { type: "success" });
    setFormData({ rating: "5", title: "", body: "" });
    setIsWriting(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Customer Reviews</h2>
        {!isWriting && (
          <Button variant="secondary" onClick={() => setIsWriting(true)}>
            Write a Review
          </Button>
        )}
      </div>

      {isWriting && (
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <div className={styles.ratingSelect}>
            <label htmlFor="rating" className={styles.label}>Rating</label>
            <select
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
          <InputField
            id="title"
            name="title"
            label="Review Title"
            value={formData.title}
            onChange={handleChange}
            error={errors.title}
            required
          />
          <div className={styles.textareaWrap}>
            <label htmlFor="body" className={styles.label}>Review</label>
            <textarea
              id="body"
              name="body"
              rows="4"
              value={formData.body}
              onChange={handleChange}
              className={`${styles.textarea} ${errors.body ? styles.inputError : ""}`}
              required
            />
            {errors.body && <span className={styles.errorMessage}>{errors.body}</span>}
          </div>
          <div className={styles.formActions}>
            <Button type="button" variant="ghost" onClick={() => setIsWriting(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Submit Review
            </Button>
          </div>
        </form>
      )}

      {reviews.length === 0 ? (
        <p className={styles.empty}>No reviews yet. Be the first to share your thoughts.</p>
      ) : (
        <div className={styles.list}>
          {reviews.map((review) => (
            <div key={review.id} className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <Rating value={review.rating} size={14} />
                <span className={styles.date}>{formatDate(review.createdAt)}</span>
              </div>
              <h4 className={styles.reviewTitle}>{review.title}</h4>
              <p className={styles.reviewBody}>{review.body}</p>
              <span className={styles.author}>{review.author}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}