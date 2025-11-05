public class LoginResponse {
    private String token;
    private String username;

    public LoginResponse(String token, String userename){
        this.token = token;
        this.username = username;
    }
}