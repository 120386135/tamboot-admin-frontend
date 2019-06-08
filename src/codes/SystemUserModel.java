package com.tamboot.admin.system.model;

import com.tamboot.webapp.core.BaseModel;

public class SystemUserModel extends BaseModel {
    private static final long serialVersionUID = 3514782545721387801L;

    private String username;

    private String password;

    private Integer status;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}
