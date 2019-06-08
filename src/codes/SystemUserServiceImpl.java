package com.tamboot.admin.system.service.impl;

import com.tamboot.admin.constants.UserStatus;
import com.tamboot.admin.system.form.CreateUserForm;
import com.tamboot.admin.system.mapper.SystemUserMapper;
import com.tamboot.admin.system.model.SystemUserModel;
import com.tamboot.admin.system.service.SystemUserService;
import com.tamboot.security.core.PasswordEncoderFactory;
import com.tamboot.web.config.BusinessException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class SystemUserServiceImpl implements SystemUserService {
    @Autowired
    private SystemUserMapper systemUserMapper;

    @Autowired
    private PasswordEncoderFactory passwordEncoderFactory;

    @Override
    @Transactional(readOnly = false)
    public SystemUserModel create(CreateUserForm form) {
        SystemUserModel existingUser = systemUserMapper.selectOneByUsername(form.getUsername());
        if (existingUser != null) {
            throw new BusinessException("用户名已存在");
        }

        String encodedPassword = passwordEncoderFactory.get().encode(form.getPassword());
        SystemUserModel user = new SystemUserModel();
        user.setUsername(form.getUsername());
        user.setPassword(encodedPassword);
        user.setStatus(UserStatus.ENABLED.value());
        systemUserMapper.insert(user);
        return user;
    }
}
