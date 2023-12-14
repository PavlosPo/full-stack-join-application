package com.social.join.mappers;

import com.social.join.dtos.UserCreateRequest;
import com.social.join.dtos.UserDTO;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-12-13T22:20:24+0200",
    comments = "version: 1.5.2.Final, compiler: javac, environment: Java 17.0.8.1 (Amazon.com Inc.)"
)
@Component
public class ICreateUserRequestMapperImpl implements ICreateUserRequestMapper {

    @Override
    public UserDTO userCreateRequestToUserDTO(UserCreateRequest userCreateRequest) {
        if ( userCreateRequest == null ) {
            return null;
        }

        UserDTO.UserDTOBuilder userDTO = UserDTO.builder();

        userDTO.firstname( userCreateRequest.getFirstname() );
        userDTO.lastname( userCreateRequest.getLastname() );
        userDTO.username( userCreateRequest.getUsername() );
        userDTO.email( userCreateRequest.getEmail() );
        userDTO.password( userCreateRequest.getPassword() );

        return userDTO.build();
    }

    @Override
    public UserCreateRequest UserDTOToUserCreateRequest(UserDTO userDTO) {
        if ( userDTO == null ) {
            return null;
        }

        UserCreateRequest.UserCreateRequestBuilder userCreateRequest = UserCreateRequest.builder();

        userCreateRequest.firstname( userDTO.getFirstname() );
        userCreateRequest.lastname( userDTO.getLastname() );
        userCreateRequest.username( userDTO.getUsername() );
        userCreateRequest.password( userDTO.getPassword() );
        userCreateRequest.email( userDTO.getEmail() );

        return userCreateRequest.build();
    }
}
