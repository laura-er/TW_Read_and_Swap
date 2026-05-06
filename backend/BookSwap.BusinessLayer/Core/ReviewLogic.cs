using BookSwap.BusinessLayer.Interfaces;
using BookSwap.BusinessLayer.Structure;
using BookSwap.Domain.Models.Review;
using BookSwap.Domain.Models.Service;

namespace BookSwap.BusinessLayer.Core;

public class ReviewLogic : ReviewActions, IReviewLogic
{
    public ServiceResponse GetAllReviews() => GetAllReviewsAction();
    public ServiceResponse GetReviewById(int id) => GetReviewByIdAction(id);
    public ServiceResponse GetReviewsByBook(int bookId) => GetReviewsByBookAction(bookId);
    public ServiceResponse GetReviewsByUser(int userId) => GetReviewsByUserAction(userId);
    public ServiceResponse CreateReview(ReviewCreateDto dto) => CreateReviewAction(dto);
    public ServiceResponse UpdateReview(int id, ReviewUpdateDto dto) => UpdateReviewAction(id, dto);
    public ServiceResponse DeleteReview(int id) => DeleteReviewAction(id);
}