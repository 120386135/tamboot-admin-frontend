package com.tamboot.admin.system.mapper;

import com.github.pagehelper.Page;
import com.tamboot.admin.system.model.SystemUserModel;
import com.tamboot.mybatis.annotation.InsertConfig;

public interface SystemUserMapper {
    @InsertConfig(autoInsertId=false)
    int insert(SystemUserModel model);
}