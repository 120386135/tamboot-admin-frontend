package com.tamboot.admin.system.mapper;

import com.github.pagehelper.Page;
import com.tamboot.admin.system.model.SystemUserModel;
import com.tamboot.mybatis.provider.CommonMapper;
import com.tamboot.mybatis.annotation.InsertConfig;

public interface SystemUserMapper extends CommonMapper<SystemUserModel, Long> {
    @InsertConfig(autoInsertId=false)
    int insertCustom(SystemUserModel model);
}