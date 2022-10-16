using Messenger.IdentityApi.Helpers;
using Messenger.IdentityApi.Models;

namespace Messenger.IdentityApi.Tests.Helpers;

public class JwtHelperTests
{
    [Fact]
    public void TestEncode()
    {
        var header = new JwtHeader();
        var data = new Data { sub = "1234567890", name = "John Doe", iat = 1516239022 };
        var signatureSecret = "hello";

        var actual = JwtHelper.Encode(header, data, signatureSecret);
        var expected = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.LeoBIKpcbFjZFGqgbrT33xI00dGUXkbbf7xgRL1IQ-I";

        Assert.Equal(expected, actual);
    }

    private class Data
    {
        public string sub { get; set; }

        public string name { get; set; }

        public int iat { get; set; }
    }
}
