package com.tamboot.admin.system.mapper;

import com.github.pagehelper.Page;
import com.tamboot.admin.system.model.SystemPermissionModel;
import org.apache.ibatis.annotations.Param;

public interface SystemPermissionMapper {
    SystemPermissionModel selectOneById(Long id);
}
