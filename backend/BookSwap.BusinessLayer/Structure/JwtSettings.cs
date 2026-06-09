namespace BookSwap.BusinessLayer.Structure;

public static class JwtSettings
{
    public const string Issuer      = "BookSwapApi";
    public const string Audience    = "BookSwapClient";
    public const string SecretKey   = "BookSwapSuperSecretKey2026!XyZ#abc";
    public const int    ExpireHours = 24;
}