package com.social.join.mappers;

import com.social.join.dtos.UserDTO;
import com.social.join.dtos.UserUpdateRequest;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-12-13T22:20:24+0200",
    comments = "version: 1.5.2.Final, compiler: javac, environment: Java 17.0.8.1 (Amazon.com Inc.)"
)
@Component
public class IUpdateUserRequestMapperImpl implements IUpdateUserRequestMapper {

    @Override
    public UserDTO userUpdateRequestToUserDTO(UserUpdateRequest userUpdateRequest) {
        if ( userUpdateRequest == null ) {
            return null;
        }

        UserDTO.UserDTOBuilder userDTO = UserDTO.builder();

        userDTO.id( userUpdateRequest.getId() );
        userDTO.firstname( userUpdateRequest.getFirstname() );
        userDTO.lastname( userUpdateRequest.getLastname() );
        userDTO.username( userUpdateRequest.getUsername() );
        userDTO.email( userUpdateRequest.getEmail() );
        userDTO.password( userUpdateRequest.getPassword() );

        return userDTO.build();
    }

    @Override
    public UserUpdateRequest UserDTOToUserUpdateRequest(UserDTO userDTO) {
        if ( userDTO == null ) {
            return null;
        }

        UserUpdateRequest.UserUpdateRequestBuilder userUpdateRequest = UserUpdateRequest.builder();

        userUpdateRequest.id( userDTO.getId() );
        userUpdateRequest.firstname( userDTO.getFirstname() );
        userUpdateRequest.lastname( userDTO.getLastname() );
        userUpdateRequest.username( userDTO.getUsername() );
        userUpdateRequest.email( userDTO.getEmail() );
        userUpdateRequest.password( userDTO.getPassword() );

        return userUpdateRequest.build();
    }
}
