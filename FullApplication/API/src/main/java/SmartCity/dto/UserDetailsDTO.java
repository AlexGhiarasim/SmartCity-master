package SmartCity.dto;


import SmartCity.model.auth.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserDetailsDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String username;
    private Set<Role> roles;

    public UserDetailsDTO(Long id, String username, Set<Role> roles) {
        this.id = id;
        this.username = username;
        this.roles = roles;
    }

}

