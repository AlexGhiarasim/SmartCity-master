package SmartCity.payload.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Set;

@Getter
@Setter
public class SignupRequest {

    @NotBlank
    @Size(max = 50)
    @Email
    private String username;

    private Set<String> role;

    private String firstName;

    private String lastName;

    @NotBlank
    @Size(min = 6, max = 40)
    private String password;
}
