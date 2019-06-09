package com.tamboot.admin.system.mapper;

import com.tamboot.admin.system.model.SystemMenuModel;
import org.apache.ibatis.annotations.Param;

import java.util.Collection;
import java.util.List;

public interface SystemMenuMapper {

    List<SystemMenuModel> selectAllByParent(Long parent);

    List<SystemMenuModel> selectAllByRoleCodes(@Param("roleCodes") Collection<String> roleCodes);
}
