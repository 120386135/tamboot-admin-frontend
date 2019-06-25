package com.tamboot.admin.system.mapper;

import com.github.pagehelper.Page;
import com.tamboot.admin.system.model.SystemPermissionModel;
import org.apache.ibatis.annotations.Param;
import com.tamboot.mybatis.provider.CommonMapper;

public interface SystemPermissionMapper extends CommonMapper<SystemPermissionModel, Long> {
    SystemPermissionModel selectOneByUrl(String url);
}
