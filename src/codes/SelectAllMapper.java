package com.tamboot.admin.system.mapper;

import com.tamboot.admin.system.model.SystemMenuModel;
import com.tamboot.mybatis.provider.CommonMapper;
import org.apache.ibatis.annotations.Param;
import java.util.Collection;
import java.util.List;

public interface SystemMenuMapper extends CommonMapper<SystemMenuModel, Long> {
    List<SystemMenuModel> selectAllByParent(Long parent);

    List<SystemMenuModel> selectAllByRoleCodes(@Param("roleCodes") Collection<String> roleCodes);
}
