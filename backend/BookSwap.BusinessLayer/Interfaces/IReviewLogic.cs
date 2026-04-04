using BookSwap.Domain.Models.Review;
using BookSwap.Domain.Models.Service;

namespace BookSwap.BusinessLayer.Interfaces;

public interface IReviewLogic
{
    ServiceResponse GetAllReviews();
    ServiceResponse GetReviewById(int id);
    ServiceResponse GetReviewsByBook(int bookId);
    ServiceResponse GetReviewsByUser(int userId);
    ServiceResponse CreateReview(ReviewCreateDto dto);
    ServiceResponse UpdateReview(int id, ReviewUpdateDto dto);
    ServiceResponse DeleteReview(int id);
}