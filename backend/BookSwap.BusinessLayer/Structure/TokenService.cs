using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BookSwap.Domain.Entities.User;
using Microsoft.IdentityModel.Tokens;

namespace BookSwap.BusinessLayer.Structure;

public class TokenService
{

    public string GenerateToken(UserEntity user)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email,          user.Email),
            new Claim(ClaimTypes.Name,           user.Username),
            new Claim(ClaimTypes.Role,           user.Role.ToString())
        };

        var key   = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtSettings.SecretKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer:             JwtSettings.Issuer,
            audience:           JwtSettings.Audience,
            claims:             claims,
            expires:            DateTime.UtcNow.AddHours(JwtSettings.ExpireHours),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public ClaimsPrincipal? ValidateToken(string token)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtSettings.SecretKey));
        var validationParams = new TokenValidationParameters
        {
            ValidateIssuer           = true,
            ValidIssuer              = JwtSettings.Issuer,
            ValidateAudience         = true,
            ValidAudience            = JwtSettings.Audience,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey         = key,
            ValidateLifetime         = true,
            ClockSkew                = TimeSpan.Zero
        };
        try
        {
            return new JwtSecurityTokenHandler().ValidateToken(token, validationParams, out _);
        }
        catch { return null; }
    }
}