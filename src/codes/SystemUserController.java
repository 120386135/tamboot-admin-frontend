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