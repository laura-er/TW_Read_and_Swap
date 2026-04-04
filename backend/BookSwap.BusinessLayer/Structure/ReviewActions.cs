using BookSwap.DataAccessLayer;
using BookSwap.DataAccessLayer.Context;
using BookSwap.Domain.Entities.Review;
using BookSwap.Domain.Models.Review;
using BookSwap.Domain.Models.Service;

namespace BookSwap.BusinessLayer.Structure;

public class ReviewActions
{
    protected ServiceResponse GetAllReviewsAction()
    {
        using var db = new BookSwapDbContext(DbSession.GetOptions());
        var reviews = db.Reviews.Select(r => new ReviewDto
        {
            Id = r.Id, Rating = r.Rating, Comment = r.Comment,
            CreatedAt = r.CreatedAt, BookId = r.BookId, UserId = r.UserId
        }).ToList();
        return new ServiceResponse { IsSuccess = true, Data = reviews };
    }

    protected ServiceResponse GetReviewByIdAction(int id)
    {
        using var db = new BookSwapDbContext(DbSession.GetOptions());
        var r = db.Reviews.Find(id);
        if (r == null)
            return new ServiceResponse { IsSuccess = false, Message = "Review not found" };
        return new ServiceResponse { IsSuccess = true, Data = new ReviewDto
        {
            Id = r.Id, Rating = r.Rating, Comment = r.Comment,
            CreatedAt = r.CreatedAt, BookId = r.BookId, UserId = r.UserId
        }};
    }

    protected ServiceResponse GetReviewsByBookAction(int bookId)
    {
        using var db = new BookSwapDbContext(DbSession.GetOptions());
        var reviews = db.Reviews.Where(r => r.BookId == bookId)
            .Select(r => new ReviewDto
            {
                Id = r.Id, Rating = r.Rating, Comment = r.Comment,
                CreatedAt = r.CreatedAt, BookId = r.BookId, UserId = r.UserId
            }).ToList();
        return new ServiceResponse { IsSuccess = true, Data = reviews };
    }

    protected ServiceResponse GetReviewsByUserAction(int userId)
    {
        using var db = new BookSwapDbContext(DbSession.GetOptions());
        var reviews = db.Reviews.Where(r => r.UserId == userId)
            .Select(r => new ReviewDto
            {
                Id = r.Id, Rating = r.Rating, Comment = r.Comment,
                CreatedAt = r.CreatedAt, BookId = r.BookId, UserId = r.UserId
            }).ToList();
        return new ServiceResponse { IsSuccess = true, Data = reviews };
    }

    protected ServiceResponse CreateReviewAction(ReviewCreateDto dto)
    {
        using var db = new BookSwapDbContext(DbSession.GetOptions());

        if (!db.Books.Any(b => b.Id == dto.BookId))
            return new ServiceResponse { IsSuccess = false, Message = "Book not found" };
        if (!db.Users.Any(u => u.Id == dto.UserId))
            return new ServiceResponse { IsSuccess = false, Message = "User not found" };

        var review = new ReviewEntity
        {
            Rating = dto.Rating,
            Comment = dto.Comment,
            CreatedAt = DateTime.UtcNow,
            BookId = dto.BookId,
            UserId = dto.UserId
        };

        try { db.Reviews.Add(review); db.SaveChanges(); }
        catch (Exception) { return new ServiceResponse { IsSuccess = false, Message = "Create review failed" }; }

        return new ServiceResponse { IsSuccess = true, Message = "Review created" };
    }

    protected ServiceResponse UpdateReviewAction(int id, ReviewUpdateDto dto)
    {
        using var db = new BookSwapDbContext(DbSession.GetOptions());
        var review = db.Reviews.Find(id);
        if (review == null)
            return new ServiceResponse { IsSuccess = false, Message = "Review not found" };

        review.Rating = dto.Rating;
        review.Comment = dto.Comment;

        try { db.SaveChanges(); }
        catch (Exception) { return new ServiceResponse { IsSuccess = false, Message = "Update review failed" }; }

        return new ServiceResponse { IsSuccess = true, Message = "Review updated" };
    }

    protected ServiceResponse DeleteReviewAction(int id)
    {
        using var db = new BookSwapDbContext(DbSession.GetOptions());
        var review = db.Reviews.Find(id);
        if (review == null)
            return new ServiceResponse { IsSuccess = false, Message = "Review not found" };

        try { db.Reviews.Remove(review); db.SaveChanges(); }
        catch (Exception) { return new ServiceResponse { IsSuccess = false, Message = "Delete review failed" }; }

        return new ServiceResponse { IsSuccess = true, Message = "Review deleted" };
    }
}