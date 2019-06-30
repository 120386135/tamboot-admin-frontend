@AsciidocConfig(title = "个人信息", orderIndex = 2)
@WithUserDetails
public class CommonUserDocTest extends TambootDocTest {

    @Test
    @AsciidocConfig(title = "获取个人信息", orderIndex = 1)
    public void details() throws Exception {
        this.mockMvc
                .perform(getJson( "/common/user/details"))
                .andExpect(status().isOk())
                .andDo(document(
                        requestParameters(),
                        commonResponseFields(
                                fieldWithPath("data").type(JsonFieldType.OBJECT).description("数据"),
                                fieldWithPath("data.userId").type(JsonFieldType.STRING).description("用户id"),
                                fieldWithPath("data.username").type(JsonFieldType.STRING).description("用户名"),
                                fieldWithPath("data.password").type(JsonFieldType.STRING).description("密码"),
                                fieldWithPath("data.accountNonExpired").type(JsonFieldType.BOOLEAN).description("账号未过期"),
                                fieldWithPath("data.accountNonLocked").type(JsonFieldType.BOOLEAN).description("账号未被锁"),
                                fieldWithPath("data.credentialsNonExpired").type(JsonFieldType.BOOLEAN).description("密码未过期"),
                                fieldWithPath("data.enabled").type(JsonFieldType.BOOLEAN).description("用户是否启用"),
                                fieldWithPath("data.roles[]").type(JsonFieldType.ARRAY).description("拥有的角色编码"),
                                fieldWithPath("data.authorities[]").type(JsonFieldType.ARRAY).description("权限信息"),
                                fieldWithPath("data.authorities[].authority").type(JsonFieldType.STRING).description("权限值").optional()
                        ))
                );
    }

    @Test
    @AsciidocConfig(title = "修改密码", orderIndex = 2, snippets = AsciidocConfig.BODY_PARAMS_SNIPPETS)
    public void updatePassword() throws Exception {
        UpdatePasswordForm form = new UpdatePasswordForm();
        form.setOldPassword("Qwb123@456");
        form.setNewPassword("Wbm@123456q");
        this.mockMvc
                .perform(postJson("/common/user/updatePassword", form))
                .andExpect(status().isOk())
                .andDo(document(
                        requestBodyFields(
                                fieldWithPath("oldPassword").type(JsonFieldType.STRING).description("* 原密码"),
                                fieldWithPath("newPassword").type(JsonFieldType.STRING).description("* 新密码，密码必须由数字、字母、特殊字符(_#@!)组成，且不能少于8位。")
                        ),
                        commonResponseFields(
                                fieldWithPath("data").ignored().optional()
                        )
                ));
    }
}