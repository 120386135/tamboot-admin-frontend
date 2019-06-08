package com.tamboot.admin.system.controller;

import com.tamboot.admin.system.form.CreateUserForm;
import com.tamboot.admin.system.model.SystemUserModel;
import com.tamboot.admin.system.service.SystemUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/system/user")
public class SystemUserController {
    @Autowired
    private SystemUserService systemUserService;

    @PostMapping("/create")
    public SystemUserModel create(@RequestBody @Valid CreateUserForm form) {
        return systemUserService.create(form);
    }
}