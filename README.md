## Principles

These principles have been adapted from the [idiomatic.js style guide](https://github.com/rwaldron/idiomatic.js/).

### If your UE5 project already has a style guide, you should follow it

Respect a pre-existing style guide. Where it and this guide disagree, the existing guide wins.

Style guides are living documents: propose changes to both when a change benefits everyone.

> #### "Arguments over style are pointless. There should be a style guide, and you should follow it."
> [_Rebecca Murphey_](https://rmurphey.com)

### All structure, assets, and code in any Unreal Engine 5 project should look like a single person created it, no matter how many people contributed

Conforming to a style guide removes guesswork and ambiguity: moving between projects never means relearning style. You never have to think about style while working; you just follow the guide.

This guide follows best practices, so following it also minimizes hard-to-track issues.

### Friends do not let friends have bad style

If someone works against a style guide, or has none, correct them.

Consistency makes it far easier to help and to be helped, on a team or in a community such as [Unreal Source](https://unrealsource.com/). Nobody enjoys untangling Blueprint spaghetti or assets named so they cannot be understood.

A different but consistent, sane style guide is fine; adapt to it. No guide at all: point them here.

### A team without a style guide is no team of mine

When you join an Unreal Engine 5 team, ask early: "Do you have a style guide?" If not, be skeptical of how well they work as a team.

### Don't Break The Law

Not legal advice: do not bring illegal content or behavior into a project. For example:

* Don't distribute content you have no right to distribute
* Don't infringe copyrights or trademarks
* Don't steal content
* Follow licensing terms, e.g. attribute when attribution is required

### Avoid Folder Sprawl

More folders do not mean easier discovery. Deep, per-asset folder trees slow people down and invite duplicate assets. Prefer a few broad, clearly named folders that group related content where people look for it.

For example, `Art/Environment` keeps static environment meshes together so a level designer sees every scenery asset at a glance. Put the set's material instances and textures in its `Materials` and `Textures` sub-folders, but do not give every prop its own folder split into `Meshes`, `Materials`, and `Textures`. Folders should make a collection easier to browse, not add structure for its own sake.

![Example of environment assets organized together in a browsable folder](https://raw.githubusercontent.com/Ultikynnys/ue5-style-guide/main/images/folder-organization-example.png)

**Figure 1.** Static environment assets grouped together in the Content Browser.

## Globally Enforced Opinions

**Forbidden Characters**


**Identifiers:** In any `Identifier` of any kind, **never** use the following unless absolutely forced to:

* White space of any kind
* Backward slashes `\`
* Symbols i.e. `#!@$%`
* Any Unicode character

Prefer only these characters when possible, matching the RegEx `[A-Za-z0-9_]+`:

* ABCDEFGHIJKLMNOPQRSTUVWXYZ
* abcdefghijklmnopqrstuvwxyz
* 1234567890
* _ (sparingly)

This maximizes compatibility of all data across every platform and tool, and avoids downtime from bad character handling in code you do not control.

## Asset Naming Conventions

Naming conventions are law. A conforming project is far easier to manage, search, parse, and maintain.

Most assets carry a prefix: a short form of the asset type, usually an acronym, followed by an underscore.

### Base Asset Name - `Prefix_BaseAssetName_Variant_Suffix`

Every asset has a _Base Asset Name_: the logical grouping of related assets it belongs to, written as `Prefix_BaseAssetName_Variant_Suffix`.

`Prefix` and `Suffix` come from the asset type, via the [Asset Name Modifiers](#asset-name-modifiers) tables and the [Suffixes](#suffixes) table below.

`BaseAssetName` is a short, recognizable name for the group. If you have a character named Bob, all of Bob's assets use `Bob`.

For a specific variation, `Variant` is a short, recognizable name for the subset. Bob's skins keep `Bob` and add a `Variant`: 'Evil' is `Bob_Evil`, 'Retro' is `Bob_Retro`.

For a generic variation, `Variant` is a two-digit number starting at `01`: nondescript rocks are `Rock_01`, `Rock_02`, and so on. Three digits is almost never needed; past 100 assets, use different base names or chained variants instead.

Variants chain. Arch Viz flooring uses the base name `Flooring` with variants like `Flooring_Marble_01`, `Flooring_Maple_01`, and `Flooring_Tile_Squares_01`.


**Examples:**

**Bob Example**

| Asset Type              | Asset Name                                                 |
| ----------------------- | ---------------------------------------------------------- |
| Skeletal Mesh           | SKM_Bob                                                    |
| Material                | M_Bob                                                      |
| Texture (Diffuse/Albedo)| T_Bob_D                                                    |
| Texture (Normal)        | T_Bob_N                                                    |
| Texture (Evil Diffuse)  | T_Bob_Evil_D                                               |

**Rocks Example**

| Asset Type              | Asset Name                                                 |
| ----------------------- | ---------------------------------------------------------- |
| Static Mesh (01)        | SM_Rock_01                                                 |
| Static Mesh (02)        | SM_Rock_02                                                 |
| Static Mesh (03)        | SM_Rock_03                                                 |
| Material                | M_Rock                                                     |
| Material Instance (Snow)| MI_Rock_Snow                                               |

### Asset Name Modifiers

Use these tables to pick an asset's prefix; suffixes are in [Suffixes](#suffixes). If a prefix and a suffix would be the same, use only the prefix.

#### Meshes

All mesh types: static, skeletal, destructible, and Chaos geometry collections.

| Asset Type              | Prefix     | Notes                            |
| ----------------------- | ---------- | -------------------------------- |
| Static Mesh             | SM_        |                                  |
| Skeletal Mesh           | SKM_       |                                  |
| Destructible Mesh       | DM_        |                                  |
| Geometry Collection     | GC_        | Chaos destruction.               |

#### Blueprint Types

Blueprint classes, plus the data types that support them, such as enumerations, structs, and interfaces, and editor-only utility variants.

| Asset Type              | Prefix     | Notes                            |
| ----------------------- | ---------- | -------------------------------- |
| Blueprint               | BP_        |                                  |
| Blueprint Component     | BPC_       | E.g. BPC_InventoryComponent      |
| Blueprint Function Library | BPFL_   |                                  |
| Blueprint Interface     | BPI_       |                                  |
| Blueprint Macro Library | BPML_      | Do not use macro libraries if possible. |
| Enumeration             | E_         |                                  |
| Structure               | ST_        |                                  |
| Tutorial Blueprint      | TBP_       |                                  |
| Camera Shake            | CS_        |                                  |
| Anim Notify             | AN_        |                                  |
| Widget Blueprint        | WBP_       |                                  |
| Editor Utility Blueprint | EUB_      |                                  |
| Editor Utility Widget    | EUW_      |                                  |

#### Materials

Every material lives in [`Art/Materials`](#artmaterials), whatever its type and whichever asset set uses it: the label does the distinguishing, not the folder. A material is never filed in `UI`, `FX`, or a system folder; browse the one folder with the Content Browser's filters instead. A material _instance_ is the exception: it follows the asset it dresses, not the material.

The only type labels are `PP`, `Decal`, `UI`, and `FX`; an `M_` material that carries none of them is a mesh material.

The label is preferred where possible: it stops a material or texture from being used by accident where it is not preferred, since material and texture flags can greatly affect how it behaves on an unintended asset. When it is omitted, the asset's name and type still identify it.

| Asset Type                    | Prefix     | Notes                            |
| ----------------------------- | ---------- | -------------------------------- |
| Material                      | M_         | A mesh material; reuse it through instances rather than new copies. A type-tied material carries its label (`M_PP_`, `M_UI_`, `M_Decal_`, `M_FX_`). |
| Material (Post Process)       | M_PP_, MI_PP_ | Post-process (screenspace) materials, named with the `PP` label. |
| Material (UI)                 | M_UI_, MI_UI_ | UI materials and instances, named with the `UI` label. |
| Material (FX)                 | M_FX_, MI_FX_ | Materials used only for particles, named with the `FX` label. |
| Material Function             | MF_        | Lives in `Art/Materials/MaterialFunctions`. |
| Material Instance             | MI_        | Lives with the asset it dresses (its folder, or a `Materials` sub-folder there); a generic instance that names no single asset lives in `Art/Materials/MaterialInstances`. |
| Material Parameter Collection | MPC_       |                                  |
| Subsurface Profile            | SP_        |                                  |
| Physical Materials            | PM_        |                                  |
| Decal                         | M_Decal_, MI_Decal_ | The `Decal` label goes right after the type. A deliberate exception to PascalCase, so a decal is named explicitly and cannot be misused. |

#### Textures

The same labels apply to textures (`T_PP_`, `T_Decal_`, `T_UI_`, `T_FX_`); a `T_` texture that carries none of them is a mesh texture.

A type-labeled texture lives in [`Art/Materials/Textures`](#artmaterials), flat with the others, and the label does the distinguishing. A texture that belongs to a single mesh or set still lives next to it.

The label is preferred here too, for the same reason.

| Asset Type              | Prefix     | Notes                            |
| ----------------------- | ---------- | -------------------------------- |
| Texture                 | T_         | A texture with no suffix is implied to be Diffuse/Albedo/Base Color. |
| Texture (Post Process)  | T_PP_      | Post-process (screenspace) textures. |
| Texture (Decal)         | T_Decal_   | The `Decal` label goes right after the type. |
| Texture (UI)            | T_UI_      | UI textures. |
| Texture (FX)            | T_FX_      | Textures used only for particles. |
| Texture Cube            | TC_        |                                  |
| Media Texture           | MTX_       |                                  |
| Render Target           | RT_        |                                  |
| Cube Render Target      | RTC_       |                                  |
| Texture Light Profile   | TLP_       |                                  |

##### Texture Packing

Layers of texture data are often packed into one texture, e.g. Emissive, Roughness, and Ambient Occlusion as its Red, Green, and Blue channels. Stack the suffix letters to name it: `_ERO`.

> A Diffuse/Albedo's alpha channel commonly holds Alpha/Opacity, so adding `A` to `_D` or `_BC` is optional.

Do not pack four channels (RGBA) except for that alpha mask in the Diffuse/Albedo: a texture with alpha costs more than one without.

#### Miscellaneous

Asset types that fit no other category, such as data assets, curves, data tables, and input mappings.

| Asset Type                 | Prefix     | Notes                            |
| -------------------------- | ---------- | -------------------------------- |
| Aim Offset              | AO_        |                                  |
| Aim Offset 1D           | AO_        |                                  |
| Animation Blueprint     | ABP_       |                                  |
| Animation Composite     | AC_        |                                  |
| Animation Montage       | AM_        |                                  |
| Animation Sequence      | A_         |                                  |
| Blend Space             | BS_        |                                  |
| Blend Space 1D          | BS_        |                                  |
| Level Sequence          | LS_        |                                  |
| Morph Target            | MT_        |                                  |
| Rig                     | Rig_       |                                  |
| Control Rig             | CR_        |                                  |
| IK Rig                  | IK_        |                                  |
| Skeleton                | SK_        |                                  |
| AI Controller           | AIC_       |                                  |
| Behavior Tree           | BT_        |                                  |
| Blackboard              | BB_        |                                  |
| Decorator               | BTD_       |                                  |
| Service                 | BTS_       |                                  |
| Task                    | BTT_       |                                  |
| Environment Query       | EQS_       |                                  |
| Level / Map                |            | [Should be in a folder called Maps.](#maps) Level naming is in [Suffixes](#suffixes). |
| Animated Vector Field      | VFA_       |                                  |
| Camera Anim                | CA_        |                                  |
| Curve                     | C_         | Color, Table, Float, and Vector curves; suffixes in [Suffixes](#suffixes). |
| Data Asset                 | DA_        |                                  |
| Primary Data Asset         | PDA_       |                                  |
| Data Table                 | DT_        |                                  |
| Input Action               | IA_        |                                  |
| Input Mapping Context      | IMC_       |                                  |
| Foliage Type               | FT_        |                                  |
| Force Feedback Effect      | FFE_       |                                  |
| Landscape Grass Type       | LG_        |                                  |
| Landscape Layer            | LL_        |                                  |
| Matinee Data               | Matinee_   |                                  |
| Media Player               | MP_        |                                  |
| File Media Source          | FMS_       |                                  |
| Object Library             | OL_        |                                  |
| PCG Graph                  | PCG_       | Procedural content generation.   |
| Sprite Sheet               | SS_        |                                  |
| Static Vector Field        | VF_        |                                  |
| Substance Graph Instance   | SGI_       |                                  |
| Substance Instance Factory | SIF_       |                                  |
| Touch Interface Setup      | TI_        |                                  |
| Paper Flipbook          | PFB_       |                                  |
| Sprite                  | SPR_       |                                  |
| Sprite Atlas Group      | SPRG_      |                                  |
| Tile Map                | TM_        |                                  |
| Tile Set                | TS_        |                                  |
| Physics Asset           | PA_        |                                  |
| Dialogue Voice          | DV_        |                                  |
| Dialogue Wave           | DW_        |                                  |
| Media Sound Wave        | MSW_       |                                  |
| Reverb Effect           | Reverb_    |                                  |
| Sound Attenuation       | SA_        |                                  |
| Sound Class             | SC_        |                                  |
| Sound Cue               | Cue_       |                                  |
| Sound Mix               | Mix_       |                                  |
| MetaSound Source        | MSS_       |                                  |
| MetaSound Patch         | MSP_       |                                  |
| Sound Wave              | S_         |                                  |
| Font                    | F_         |                                  |
| Font Face               | FF_        |                                  |
| Slate Brush             | Brush_     |                                  |
| Slate Widget Style      | Style_     |                                  |
| Particle System         | PS_        |                                  |
| Niagara System          | NS_        | The placeable VFX asset.         |
| Niagara Emitter         | NE_        |                                  |
| Niagara Module Script   | NM_        |                                  |
| Niagara Parameter Collection | NP_   |                                  |
| Niagara Parameter Collection (Instance) | NPI_ |                                  |
| Gameplay Ability        | GA_        |                                  |
| Gameplay Effect         | GE_        |                                  |
| Gameplay Cue Notify     | GCN_       |                                  |

### Suffixes

A suffix differentiates an asset by its specific type. Assets come in all kinds of flavors, and outside Unreal every file ends in `.uasset`, so the suffix is often the only thing that tells you what an asset is supposed to be. Every asset type named by a suffix is listed here; its prefix, if it has one, is in the tables above. Not every asset type needs one, though: some have no meaningful differentiation, so no suffix is completely fine. An instance is never named with a suffix; it takes a prefix instead (`MI_` for a material instance, `NPI_` for a Niagara Parameter Collection instance).

| Asset Type              | Suffix     | Notes                            |
| ----------------------- | ---------- | -------------------------------- |
| Texture (Diffuse/Albedo/Base Color) | _D / _BC | `_D` and `_BC` are interchangeable. |
| Texture (Normal)        | _N         |                                  |
| Texture (Roughness)     | _R         |                                  |
| Texture (Alpha/Opacity) | _A         |                                  |
| Texture (Ambient Occlusion) | _O     |                                  |
| Texture (Bump)          | _B         |                                  |
| Texture (Emissive)      | _E         |                                  |
| Texture (Mask)          | _Mask / _MSK | `_Mask` and `_MSK` are both allowed. |
| Texture (Specular)      | _S         |                                  |
| Texture (Metallic)      | _M         |                                  |
| Texture (Packed)        | _*         |                                  |
| Color Curve             | _Color     |                                  |
| Curve Table             | _Table     |                                  |
| Float Curve             | _Float     |                                  |
| Vector Curve            | _Vector    |                                  |
| Sound Concurrency       | _SC        | Should be named after a SoundClass |

#### Level Suffixes

Level suffixes are a special case. `_P`, `_Audio`, `_Light`, `_Geo`, and `_Gameplay` are fixed, and each holds only its own kind of content. Any other level suffix conveys user-defined intent, so it can be anything that says what kind of level it is. Unless otherwise specified, a level component is a geometry level, so it usually contains only geometry. A level with no suffix at all is the special case: because it is monolithic it contains everything, so it needs no suffix. Monolithic maps are not preferred, but they cannot be avoided in small levels or test levels; avoid them anywhere else, since a monolithic map is almost impossible to work on simultaneously with several people. A bare level is fine for testing and other one-off cases: it is usually used only where a single person will ever work on the level. A small level tends to be monolithic too: making several level components for a main menu, for example, would be overkill.

| Asset Type              | Suffix     | Notes                            |
| ----------------------- | ---------- | -------------------------------- |
| Level (Persistent)      | _P         | The glue component: it holds nothing, and only references the level's other components, the ones that match the level name. |
| Level (Audio)           | _Audio     | Audio only.                      |
| Level (Lighting)        | _Light     | Lighting only.                   |
| Level (Geometry)        | _Geo       | Geometry only.                   |
| Level (Gameplay)        | _Gameplay  | Gameplay only: enemies, spawn points, the Level Blueprint, and similar. |

## Content Directory Structure

Directory structure is law too, on par with naming: the two go hand in hand, and breaking either causes chaos.

All project content lives under a folder named after the project (`Content/Haeretica`), split into a fixed set of top-level folders, each the single home for one class of asset. DLC, patches, and sub-projects that ship separately are the exception: each gets its own top-level root. Because most assets carry their type in their prefix, these folders group by _purpose_ rather than by asset type; use the Content Browser's filters and search to narrow by type within a folder. An asset lives where it is owned, not where its type or usage might suggest, so it moves as a unit with the system it serves. Everyone can then find any asset's home without asking.

Materials are the one exception: every material and type-labeled texture lives in `Art/Materials`, grouped by type rather than by purpose, because a material is a shared input any system can reference. A material instance is not an exception: it lives with the asset it dresses, so the two are deleted together. See [`Art/Materials`](#artmaterials).

> Do not create a folder called `Assets`, and do not split a folder into sibling folders that are only distinguished by asset type (for example a `Meshes` folder next to a `Textures` folder). Name folders after the thing they contain, not the type of asset that happens to live there. A few type-named folders are allowed because one asset kind has no purpose-named home: [`Art/Materials`](#artmaterials) (with its `MaterialInstances`, `MaterialFunctions`, and `Textures` sub-folders), `Art/PhysicalMaterials`, and `UI/Fonts`. A set that would otherwise be one large flat pile may also add a `Materials` folder for its own material instances and a `Textures` folder for its textures, such as `Art/Environment/Materials` and `Art/Environment/Textures`, without splitting the set apart.

**Example Project Content Structure**
<pre>
|-- Content
    |-- <a href="#use-a-top-level-folder-for-project-specific-assets">Haeretica</a>
        |-- <a href="#art">Art</a>
        |   |-- Characters
        |   |   |-- Mech
        |   |   |-- MeleeDummy
        |   |   |-- Player
        |   |   |-- Priestess
        |   |   |-- RangedDummy
        |   |   |-- Tank
        |   |-- Components
        |   |-- Environment
        |   |   |-- Materials
        |   |   |-- Textures
        |   |-- Interactables
        |   |-- <a href="#artmaterials">Materials</a>
        |   |   |-- MaterialInstances
        |   |   |-- MaterialFunctions
        |   |   |-- Textures
        |   |-- Tools
        |   |-- Weapons
        |-- <a href="#blueprint">Blueprint</a>
        |   |-- Components
        |   |-- Enemies
        |   |-- GameModes
        |   |-- Interactables
        |   |-- Player
        |   |-- Tools
        |   |-- <a href="#give-every-blueprint-system-its-own-folder">Weapons</a>
        |-- <a href="#fx">FX</a>
        |-- <a href="#maps">Maps</a>
        |   |-- ArenaLevel1
        |   |-- Level1
        |   |-- Level2
        |   |-- Level3
        |   |-- MainMenu
        |   |-- TestLevels
        |-- <a href="#sfx">SFX</a>
        |   |-- Attenuation
        |   |-- Enemies
        |   |-- Music
        |-- <a href="#ui">UI</a>
            |-- BaseElements
            |-- HUD
            |-- MainMenu
            |-- Options
            |-- Transition
</pre>

The reasons for this structure are listed in the following sub-sections.

### Folder Names

PascalCase is the only naming standard in the project: every folder name and every asset base name uses it, and the rules below follow from that.

#### Always Use PascalCase

PascalCase starts with a capital and capitalizes every following word instead of using spaces: `DesertEagle`, `RocketPistol`, `ASeriesOfWords`.

#### Never Use Spaces

Never use spaces: they break many engineering tools and batch processes. Keep the project root space-free too, e.g. `D:\Project` rather than `C:\Users\My Name\My Documents\Unreal Projects`.

#### Never Use Unicode Characters And Other Symbols

A character named 'Zoë' gets the folder name `Zoe`. Unicode is worse than spaces for engineering tools, and parts of UE5 do not support it in paths at all.

A Unicode character in your computer's user name (say you are `Zoë`) breaks any project under `My Documents`; moving it somewhere like `D:\Project` usually fixes it.

Characters outside `a-z`, `A-Z`, and `0-9`, such as `@`, `-`, `,`, `*`, and `#`, cause hard-to-track issues on other platforms, source control, and weaker tools.

### Use A Top Level Folder For Project Specific Assets

Every project asset lives in a folder named after the project: for 'Haeretica', _all_ content lives in `Content/Haeretica`.

> The `Developer` folder is not project specific: your project does not rely on it. See [Developer Folders](#use-developer-folders-for-local-testing).

The reasons follow.

#### No Global Assets

Same principle as not polluting the global namespace in code. Assets outside a project folder make a strict layout hard to enforce, and invite the habit of not organizing assets.

Every asset needs a purpose to belong in the project. An experimental test goes in a personal, hidden-by-default [`Developer`](#use-developer-folders-for-local-testing) folder; shared work-in-progress goes in [`Prototype`](#prototype).

#### Reduce Migration Conflicts

Teams routinely copy assets between projects, and the Content Browser's Migrate copies not just the selected asset but every dependency with it.

Those dependencies are the danger. When assets sit outside a top level folder and two projects share similarly named or already-migrated assets, a migration can silently overwrite the existing ones. This is also why Epic's Marketplace staff enforces the same rule for submitted assets.

Merge a migration safely with the Content Browser's 'Replace References' tool: assets outside your top level folder are clearly pending a merge. Once merged, no stray top level folder should remain in your Content tree, and future migrations are safe.


**Shared Material Example:**

Suppose you migrate a material `Content/M_Shared` into a project that has none: that works fine. Now an artist builds material instances on `Content/M_Shared`, and someone migrates a modular mesh set that also depends on a `Content/M_Shared`; Migrate is forced to copy that material too and overwrites the existing asset.

If the two versions differ in _any way_, you can break the project's entire material library and everything already migrated to it. A simple mesh migration becomes a very ugly task, often for someone who never saw both.

#### Samples, Templates, and Marketplace Content Are Risk-Free

Sample content, template files, and marketplace assets cannot interfere with your project, as long as your top level folder is uniquely named.

Marketplace content cannot be trusted to follow the top level folder rule. Much of it keeps its own top level folder yet still pollutes the global `Content` folder with modified Epic sample content and level files.

This leaves one worst case: two marketplace assets that both contain the same Epic sample content. Keep every asset, including any sample content you move in, in your project folder and the project never breaks.

#### DLC, Sub-Projects, and Patches Are Easily Maintained

DLC and sub-projects that are either migrated out or simply not cooked in a build get their own top level content folder. That makes cooking DLC separately, and migrating sub-projects in and out, far easier. A patch that changes one asset's material or adds specific override behavior goes in its own patch folder, where it cannot break the core project.

### Use Developer Folders For Local Testing

Team members need a sandbox to experiment in without risking the core project, and the work may need to be in source control. Not every team uses Developer folders, but those that do hit a common problem: unready assets leaking into the project.

An artist iterating on a modular mesh set, still adjusting sizing and grid snapping, leaves those assets in the main project folder. A world builder uses them across a level, and the assets later change or disappear, costing the team a huge amount of rework.

In a Developer folder the world builder would never have seen them: the Content Browser hides Developer folders by default, so they cannot be used by accident.

When the assets are ready, move them into the project folder and fix up redirectors: that is the move from experimental to production.

### Top Level Folders

Beneath the project folder, content is split into a fixed set of top-level folders. Each folder is a single, obvious home for one class of asset:

* `Art` - All visual assets, organized by kind. See [Art](#art).
* `Blueprint` - The Blueprints that make up the project's logic. See [Blueprint](#blueprint).
* `FX` - Niagara systems and the other assets that make up visual effects. See [FX](#fx).
* `Maps` - All map files. See [Maps](#maps).
* `Prototype` - Throwaway or work-in-progress content that is not ready for the project proper. See [Prototype](#prototype).
* `SFX` - Generic audio shared across the project: sound classes, attenuation presets, shared music. Audio tied to one asset lives with that asset. See [SFX](#sfx).
* `UI` - User interface assets: widget Blueprints, their material instances, and fonts. See [UI](#ui).

Not every project needs every folder. What matters is that when a folder exists, it is named and used exactly as described below, so its location is always predictable.

#### Art

`Art` is the single home for the project's visual assets, grouped by kind:

* `Art/Characters` - Character art, with a sub-folder per character (`Art/Characters/Priestess`).
* `Art/Components` - Art for the reusable actor components in `Blueprint/Components`: their meshes, material instances, and textures.
* `Art/Environment` - The one place a level designer looks for scenery: environment meshes, kept flat at the root so no one digs for a prop, plus a `Materials` sub-folder for the set's material instances and a `Textures` sub-folder for its textures. Any large flat set may add the same two folders. A placeable actor that is not scenery belongs to its own system: art in `Art/<System>`, Blueprint in `Blueprint/<System>`; see [Blueprint](#blueprint).
* `Art/LUT` - Color lookup tables (LUTs) used for color grading.
* `Art/Materials` - The single home for every material in the project, filed flat at the root of the folder whatever its type and whichever asset set uses them. The prefix carries the type (`M_PP_`, `M_UI_`, `M_FX_`, `M_Decal_`), so the materials need no type sub-folders. See [`Art/Materials`](#artmaterials).
  * `Art/Materials/MaterialInstances` - Generic material instances that name no single asset, such as a generic wall instance.
  * `Art/Materials/MaterialFunctions` - Reusable material functions.
  * `Art/Materials/Textures` - Textures, flat: the generic reusable ones and every type-labeled one (`T_PP_`, `T_UI_`, `T_FX_`, `T_Decal_`). A texture specific to a single mesh or set lives next to it in `Art` instead.
* `Art/PhysicalMaterials` - Physical materials used for surface responses such as footstep and impact effects.

A gameplay system whose art fits none of the folders above gets a matching folder here, such as `Art/Weapons` or `Art/Tools`, mirroring its `Blueprint/<System>` folder. Every system splits the same way: art and animation in `Art/<System>`, logic in `Blueprint/<System>`. An Animation Blueprint is animation, so it lives here too; see [Blueprint](#blueprint).

#### Blueprint

`Blueprint` holds the project's logic: Blueprints and the data assets that support them, such as enumerations, structs, data tables, input actions, behavior trees, blackboards, and environment queries. It is not a home for art or animation. Textures, meshes, material instances, and Animation Blueprints (`ABP_`) live in `Art` next to the asset they serve; every base material lives in `Art/Materials` (a generic instance lives in `Art/Materials/MaterialInstances`); and sounds, effects, and UI assets live in the dedicated [`SFX`](#sfx), [`FX`](#fx), and [`UI`](#ui) folders. Interactables follow the same split: `Blueprint/Interactables` holds the interactable Blueprints, `Art/Interactables` their meshes, material instances, and textures.

* `Blueprint/LevelActors` - Rarely needed: a Blueprint a designer drops into a level normally belongs to a system and lives in that system's folder (`Blueprint/<System>`); only a lone actor with no system of its own lands here.
* `Blueprint/Components` - Reusable actor components.
* `Blueprint/Enemies`, `Blueprint/Player`, `Blueprint/Weapons`, `Blueprint/Interactables`, `Blueprint/GameModes`, and `Blueprint/Tools` - One folder per gameplay system, holding all of the system's Blueprints. See [Give Every Blueprint System Its Own Folder](#give-every-blueprint-system-its-own-folder). Its art and animation live in `Art/<System>`.
* `Blueprint/UI` - UI logic: the non-widget UI Blueprints, such as HUD classes, plus UI data such as enumerations. Every UI Blueprint that is not a widget lives here; the widgets themselves are the UI and stay in [`UI`](#ui).

#### FX

`FX` holds visual effects: Niagara systems and emitters, the meshes and material instances they rely on, and any other asset that only exists to serve an effect. A base effect material (`M_FX_`) and a type-labeled effect texture (`T_FX_`) live in [`Art/Materials`](#artmaterials) and its `Textures` sub-folder, flat with the other materials; an effect's own instance (`MI_FX_`) lives here beside the effect it dresses.

#### Maps

Every project tends to have its own map naming system, especially with sub-levels or streaming levels, but all levels belong in `/Content/Haeretica/Maps`.

Being able to name a map without explaining where it is saves time. Sub-folders like `Maps/Level1/` or `Maps/ArenaLevel1/` are fine, as long as everything sits under `/Content/Haeretica/Maps`.

One map folder also makes cooking and lighting builds easier for engineers, and removes the risk of a map being left out of a build by accident. It simplifies QA too.

A level folder may contain a `_GENERATED` folder, at the root of `Maps` or inside a level folder: the editor's own transient output. `_GENERATED` is off-limits: it is machine-generated, fair to delete and regenerate at any time, and none of this guide's naming or structure rules apply inside it, so do not rename, move, or tidy its contents.

#### Prototype

`Prototype` is the shared counterpart to a personal `Developer` folder: experimental or in-progress content that has no permanent home yet, such as greybox levels, test Blueprints, and rough assets. Your own scratch work stays in a `Developer` folder. Anything here may be deleted or heavily changed, and nothing shipped may depend on it.

`Prototype` is the only exception to the structure rules: the single project folder allowed to hold temporary content, whether it will be removed or moved into the project. Everywhere else, an asset lives in its one permanent home.

Keeping prototype content together makes it obvious what is disposable and trivial to strip before a build. When a prototype is ready for production, move it into its proper home and fix up redirectors.

#### SFX

`SFX` holds only audio shared across the project: shared sound classes, attenuation and concurrency presets, shared music, and any cue or wave used by more than one asset.

Audio belonging to a single asset lives with that asset, so it migrates as a unit with the thing it serves: a weapon's sounds under `Art/Weapons/<Weapon>`, a character's under `Art/Characters/<Character>`, an interactable's under `Art/Interactables/<System>`, an effect's alongside that effect in `FX`. Cues move together with the waves, attenuations, and sound classes they use, so a set migrates as one. A sound class serving one asset lives with it, such as the player's `SC_Player` in `Art/Characters/Player`; only shared classes stay here (`SC_Master`, `SC_Weapon`, `SC_Enemy`). The rest of `SFX` is grouped by kind, such as `Music`, `Attenuation`, or a shared `Enemies` set.

#### UI

`UI` holds the interface's widgets and fonts, plus the material instances tied to them. Group them by screen or element, such as `UI/HUD`, `UI/MainMenu`, or `UI/Options`, so a screen's widgets and its instances migrate together: a crosshair instance in `UI/HUD`, a button instance in `UI/BaseElements`.

A base UI material (`M_UI_`) and a type-labeled UI texture (`T_UI_`) do not live here: they live in [`Art/Materials`](#artmaterials) and its `Textures` sub-folder, flat with the other materials. A generic UI instance that dresses no single screen lives in `Art/Materials/MaterialInstances`. A generic weapon icon that names no single weapon (a placeholder or fallback) is a base element, in `UI/BaseElements`. Fonts exist only for UI, so `UI/Fonts` is the one type-named folder allowed inside `UI`. A non-widget UI Blueprint, such as a HUD class, is UI logic and lives in `Blueprint/UI`; only widgets, their instances, and fonts stay in `UI`.


### Keep Base Classes With Their System

There is no separate `Core` folder. A base class lives in its system's folder, next to the concrete Blueprints that inherit from it: a base `BP_WeaponBase` sits in `Blueprint/Weapons` beside `BP_Rifle`, a base pickup class sits in `Blueprint/Interactables` beside the specific health and ammo pickups, and base `GameMode`, `Character`, and `PlayerController` classes live in `Blueprint/GameModes` and `Blueprint/Player`. See [Give Every Blueprint System Its Own Folder](#give-every-blueprint-system-its-own-folder).

Base classes deserve a "don't touch these" reputation wherever they sit: a change there affects every child and can break the system project-wide. Designers make gameplay tweaks in child classes that expose functionality, and world builders use prefab Blueprints in designated folders, rather than editing a base class.

Give each specific pickup its own folder, such as `Blueprint/Interactables/Ammo/`, and leave the base class alone.

### Give Every Blueprint System Its Own Folder

Within `Blueprint`, each gameplay system gets its own folder named after the system, holding all of the system's logic: every Blueprint, base class, placeable actor, and interface, plus the data assets that support them. Only logic belongs here; the system's art and animation live in the matching `Art/<System>` folder, so `Blueprint/Interactables` holds the interactable Blueprints while `Art/Interactables` holds its meshes, material instances, and textures.

For example, a weapons system might look like this:

<pre>
|-- Blueprint
    |-- Weapons
        |-- BP_WeaponBase
        |-- BP_DesertEagle
        |-- BP_RocketPistol
        |-- BP_Rifle
</pre>

> Do not create a folder named only after an asset type, such as `Meshes` or `SkeletalMeshes`, to separate assets inside a system. The only exceptions are a `Materials` folder for the set's material instances and a `Textures` folder for its textures, as in `Art/Environment`. Asset names already carry their type via their prefix, and the Content Browser can filter by type, so such folders only add redundant path segments: to see every static mesh under `Art/Environment/`, turn on the Static Mesh filter.

### Very Large Asset Sets Get Their Own Folder Layout

A pseudo-exception, where folders are named after their subject rather than their asset type.

Some asset types produce a huge volume of files that each serve a unique purpose, most often Animation and Audio. Once you have 15+ such assets that belong together, keep them together.

For example, animations shared across characters live together in a shared `Animations` folder with sub-folders such as `Locomotion` or `Cinematic`, rather than per character.

> This does not apply to textures or materials. A `Rocks` folder may hold many textures, but they belong to a few specific rocks and are named accordingly, even when a shared material in [`Art/Materials/Textures`](#artmaterials) samples them.

### `Art/Materials`

`Content/Haeretica/Art/Materials` is the single home for every material and type-labeled texture in the project, whatever its type and whichever asset set uses them. The prefix carries the type, so the materials need no type sub-folder.

> This makes a 'use material instances only' policy easy to enforce: every base material in the project sits in this one folder, so this folder is the complete set of materials to instance.

When adding a new asset, look at the materials that already exist before creating one, and instance an existing material rather than adding a new one; the goal is to keep the number of unique materials as low as possible. A genuinely unique material that is never reused is still an `M_`, filed here, never with its consumer; its instance, if it has one, goes with the asset instead.

`Art/Materials` holds every material (`M_`) flat at its root, plus a `MaterialInstances` sub-folder for instances that name no single asset, a `MaterialFunctions` sub-folder for reusable functions, and a `Textures` sub-folder for type-labeled textures.

Every material lives here, whatever its type: a mesh material (`M_`) and a type-tied one (`M_PP_`, `M_UI_`, `M_FX_`, `M_Decal_`). The label distinguishes them; browse the folder with the Content Browser's type filters instead of splitting it into `PP`, `UI`, `FX`, and `Decal` sub-folders.

A material instance is placed by what it dresses, not by its material. An instance tied to an asset or asset set lives with it, in the asset's folder or a `Materials` sub-folder there, so deleting the folder deletes the instance too and no orphan is left behind: a weapon's instance sits in `Art/Weapons`, the environment set's in `Art/Environment/Materials`. Only a generic instance that names no single asset, such as a generic wall instance, lives in `Art/Materials/MaterialInstances`.

`Art/Materials/Textures` holds the project's textures flat: the generic reusable ones and every type-labeled one (`T_PP_`, `T_UI_`, `T_FX_`, `T_Decal_`). A generic texture such as a seamless brick or wood map is here because some material samples it; a texture specific to a single mesh or set stays next to that mesh or set in `Art`.

Materials sit at the root of this folder, whatever asset set uses them; `MaterialInstances`, `MaterialFunctions`, and `Textures` are the sub-folders. A material never sits in `MaterialInstances`, `MaterialFunctions`, or `Textures`. A material is reused through instances rather than copies, ideally for everything in the project, from props to seamless textures.

Do not build an UBER material. A single material with static parameter switches for every feature looks tempting, and GPU shader execution stays cheap even with many switches, but every switch multiplies the material's shader permutations. The cost lands elsewhere: shader compilation time, editor responsiveness, cook and package time, and shader storage and memory.

It is also fragile to manage. A slight change can cascade into other branches of the material graph, and it recompiles the full permutation set, so even small tweaks stall iteration. Keep materials decoupled, as good programming practice and good material practice alike.

Instead, keep materials in reasonable groups, for example by shading mode: `M_Opaque`, `M_Transparent`, `M_Foliage`. One-off implementations must never be added into these materials; they stay as generic as possible while forcing visual cohesion, so the default way to shade anything in the project is an instance of one of them.

There is no separate debug folder: a testing or debug material lives in `Art/Materials` like any other material, because the folder already holds exactly that kind of reusable, non-production-specific material.

### No Stray Empty Folders

Avoid stray empty folders; they clutter the Content Browser. The structural folders are the exception: creating one ahead of content is fine, such as `Art/LUT` or `Art/PhysicalMaterials` before the project has any LUT or physical material.

If the Content Browser has an empty folder you cannot delete:
1. Be sure you are using source control.
1. Run Fix Up Redirectors on your project.
1. Go to the folder on-disk and delete the assets inside.
1. Close the editor.
1. Sync your source control state (for Perforce, Reconcile Offline Work on your content directory).
1. Open the editor and confirm everything works; if not, revert and find the cause.
1. Confirm the folder is gone.
1. Submit to source control.


## Blueprint Guidelines

This section will focus on Blueprint classes and their internals. When possible, style rules conform to [Epic's Coding Standard](https://dev.epicgames.com/documentation/en-us/unreal-engine/epic-cplusplus-coding-standard-for-unreal-engine).

Remember: Blueprinting badly bears blunders, beware! (Phrase by [KorkuVeren](http://github.com/KorkuVeren))

### Compiling

All Blueprints compile with zero warnings and zero errors. Fix warnings and errors immediately; they cascade into unexpected behavior fast.

Do *not* submit broken Blueprints to source control. If you must store them, shelve them.

A broken Blueprint shows up as broken references, unexpected behavior, cooking failures, and needless recompilation, and can break your entire game.

### Variables

The words `variable` and `property` may be used interchangeably.

#### Naming


**Nouns:** All non-boolean variable names must be clear, unambiguous, and descriptive nouns.


**PascalCase:** All non-boolean variables should be in the form of PascalCase.


**Examples:**

* `Score`
* `Kills`
* `TargetPlayer`
* `Range`
* `CrosshairColor`
* `AbilityID`


**Boolean `b` Prefix:**

All booleans should be named in PascalCase but prefixed with a lowercase `b`.

Example: Use `bDead` and `bEvil`, **not** `Dead` and `Evil`.

UE5 drops the `b` in user-friendly displays of the variable.


**Boolean Names:**


**General And Independent State Information:** Name a boolean as a descriptive adjective when it represents general information. Do not phrase it as a question with words such as `Is`, which is reserved for functions.

Example: Use `bDead` and `bHostile`, **not** `bIsDead` and `bIsHostile`.

Avoid verbs such as `bRunning`; they tend to lead to complex states.


**Complex States:** Do not use booleans for complex or dependent states; adding and removing states becomes hard and unreadable. Use an enumeration instead.

Example: A weapon that cannot be both reloading and equipping should **not** use `bReloading` and `bEquipping`. Define an enumeration `E_WeaponState` and a variable `WeaponState` of that type, so new weapon states are easy to add.

Example: Do **not** use `bRunning` alongside `bWalking` or `bSprinting`; define an enumeration with clear state names.


**Considered Context:** A variable name must not be redundant with its context; every Blueprint reference to it already carries that context.


**Examples:**

Consider a Blueprint called `BP_PlayerCharacter`.

**Bad**

* `PlayerScore`
* `PlayerKills`
* `MyTargetPlayer`
* `MyCharacterName`
* `CharacterSkills`
* `ChosenCharacterSkin`

Each of these is redundant: a variable defined by `BP_PlayerCharacter` already implies it belongs to that Blueprint.

**Good**

* `Score`
* `Kills`
* `TargetPlayer`
* `Name`
* `Skills`
* `Skin`


**Do _Not_ Include Atomic Type Names**

Atomic variables hold data in its simplest form: booleans, integers, floats, and enumerations. For style, strings and vectors count as atomic too, though technically they are not.

> A vector holds three floats but is usually handled as a whole, as is a rotator.

> Do _not_ treat Text as atomic; it hides localization. The atomic type of a string of characters is `String`, not `Text`.

Name an atomic variable without its type.

Example: Use `Score`, `Kills`, and `Description`, **not** `ScoreFloat`, `FloatKills`, `DescriptionString`.

The one exception is a variable that counts 'a number of' something and reads poorly without the type.

Example: A fence generator storing a post count uses `NumPosts` or `PostsCount`, not `Posts`, which can read as an Array of a type named `Post`.


**Do Include Non-Atomic Type Names**

Non-atomic (complex) variables hold a collection of atomic values: structs, classes, interfaces, and primitives with hidden behavior such as `Text` and `Name`.

> An Array of an atomic type is a list of variables, but an Array does not change a type's atomicness.

Include the type name, still considering context.

When a class owns an instance of a complex type, e.g. `BP_PlayerCharacter` owns a `BP_Hat`, store it under the type name with no modification.

Example: Use `Hat`, `Flag`, and `Ability`, **not** `MyHat`, `MyFlag`, and `PlayerAbility`.

When a class does not own the value, use a noun plus the type name.

Example: A `BP_Turret` targeting a `BP_PlayerCharacter` stores it as `TargetPlayer`: within `BP_Turret` that reads clearly as a reference it does not own.



**Arrays:**

Arrays follow the same rules but take a plural noun.

Example: Use `Targets`, `Hats`, and `EnemyPlayers`, **not** `TargetList`, `HatArray`, `EnemyPlayerArray`.


#### Editable Variables

Mark a variable `Editable` when it is safe to change to configure the Blueprint's behavior.

A variable that is unsafe to change, or that should not be exposed to designers, should _not_ be editable, unless engineering requires `Expose On Spawn`.

Do not mark variables `Editable` arbitrarily.


**Tooltips:**

Every `Editable` variable, including one made editable only for `Expose On Spawn`, needs a `Tooltip` explaining how changing it affects the Blueprint's behavior.


**Slider And Value Ranges:**

Use slider and value ranges on `Editable` variables whenever some value should _not_ be set.

Example: A fence generator's `PostsCount` should set 0 as a minimum; a value of -1 makes no sense.

An editable variable used in a Construction Script needs a reasonable Slider Range, so no one can assign a large value that crashes the editor.

Define a Value Range only when the bounds are known: a Slider Range blocks accidental large inputs, while an undefined Value Range still lets a user enter a 'dangerous' but valid value outside it.

#### Categories

A class with few variables needs no categories.

With a moderate number (5-10), give every `Editable` variable a non-default category, commonly `Config`.

With many variables, group `Editable` variables into sub-categories under the base category `Config`, and give non-editable variables descriptive categories for their usage.

> You can define sub-categories by using the pipe character `|`, i.e. `Config | Animations`.

Example: A weapon class set of variables might be organized as:

    |-- Config
    |    |-- Animations
    |    |-- Effects
    |    |-- Audio
    |    |-- Recoil
    |    |-- Timings
    |-- Animations
    |-- State
    |-- Visuals

#### Variable Access Level

In C++, public means any code can read a variable, protected means the class and its children, private means the class alone.

Blueprints have no protected access.

Treat `Editable` variables as public and non-editable variables as protected.


**Private Variables:** Do not mark a variable private unless you know it should never be reached by a child class. Until Blueprints can mark variables `protected`, reserve private for when child-class access must be blocked.

#### Advanced Display

Mark a variable that is editable but rarely touched as `Advanced Display`, which hides it until the advanced display arrow is clicked. The option sits in the variable details list.

#### Transient Variables

Transient variables are not saved or loaded and start at zero or null, which suits references to objects and actors whose value is unknown until run-time. This stops the editor saving a reference and speeds up saving and loading the class.

Always initialize a transient variable to zero or null; anything else causes hard-to-debug errors.

#### Config Variables

Do not use the `Config Variable` flag; it makes Blueprint behavior harder for designers to control. Reserve config variables for C++ and rarely changed values, and mark such variables `Advanced Display`.

### Functions, Events, and Event Dispatchers

How to author functions, events, and event dispatchers. Everything that applies to functions applies to events too, unless noted.

#### Function Naming

Function, event, and event dispatcher names matter: the name alone should answer questions such as:

* Is it a pure function?
* Is it fetching state information?
* Is it a handler?
* Is it an RPC?
* What is its purpose?


**All Functions Should Be Verbs**

Every function and event performs an action: getting info, computing data, blowing something up. So every function starts with a verb, present tense where possible, with context for what it does.

`OnRep` functions, event handlers, and event dispatchers are exempt.

Good examples:

* `Fire` - Good example if in a Character / Weapon class, as it has context. Bad if in a Barrel / Grass / any ambiguous class.
* `Jump` - Good example if in a Character class, otherwise, needs context.
* `Explode`
* `ReceiveMessage`
* `SortPlayerArray`
* `GetArmOffset`
* `GetCoordinates`
* `UpdateTransforms`
* `EnableBigHeadMode`
* `IsEnemy` - ["Is" is a verb.](http://writingexplained.org/is-is-a-verb)

Bad examples:

* `Dead` - Is Dead? Will deaden?
* `Rock`
* `ProcessData` - Ambiguous, these words mean nothing.
* `PlayerState` - Nouns are ambiguous.
* `Color` - Verb with no context, or ambiguous noun.


**Property RepNotify Functions Always `OnRep_Variable`**

Functions for replicated variables with notification take the form `OnRep_Variable`, forced by the Blueprint editor. A C++ `OnRep` function follows the same convention when exposed to Blueprints.


**Info Functions Returning Bool Should Ask Questions**

A function that changes no state, and only gets information or computes a yes/no value, should ask a question.

Without the question it reads as an action that returns whether it succeeded.

Good examples:

* `IsDead`
* `IsOnFire`
* `IsAlive`
* `IsSpeaking`
* `IsHavingAnExistentialCrisis`
* `IsVisible`
* `HasWeapon` - ["Has" is a verb.](http://grammar.yourdictionary.com/parts-of-speech/verbs/Helping-Verbs.html)
* `WasCharging` - ["Was" is past-tense of "be".](http://grammar.yourdictionary.com/parts-of-speech/verbs/Helping-Verbs.html) Use "was" when referring to 'previous frame' or 'previous state'.
* `CanReload` - ["Can" is a verb.](http://grammar.yourdictionary.com/parts-of-speech/verbs/Helping-Verbs.html)

Bad examples:

* `Fire` - Is on fire? Will fire? Do fire?
* `OnFire` - Can be confused with event dispatcher for firing.
* `Dead` - Is dead? Will deaden?
* `Visibility` - Is visible? Set visibility? A description of flying conditions?


**Event Handlers and Dispatchers Should Start With `On`**

Event handlers and dispatchers start with `On`, though the verb may move to the end when past tense reads better.

[Collocations](http://dictionary.cambridge.org/us/grammar/british-grammar/about-words-clauses-and-sentences/collocation) of `On` are exempt from the verb rule.

`Handle` is not allowed: Unreal uses `On`, even where other frameworks prefer `Handle`.

Good examples:

* `OnDeath` - Common collocation in games
* `OnPickup`
* `OnReceiveMessage`
* `OnMessageReceived`
* `OnTargetChanged`
* `OnClick`
* `OnLeave`

Bad examples:

* `OnData`
* `OnTarget`
* `HandleMessage`
* `HandleDeath`


**Remote Procedure Calls Should Be Prefixed With `Server`, `Client`, or `Multicast`**

Prefix every RPC with `Server`, `Client`, or `Multicast`, no exceptions, then follow the other function-naming rules.

Good examples:

* `ServerFireWeapon`
* `ClientNotifyDeath`
* `MulticastSpawnTracerEffect`

Bad examples:

* `FireWeapon` - Does not indicate its an RPC of some kind.
* `ServerClientBroadcast` - Confusing.
* `AllNotifyDeath` - Use `Multicast`, never `All`.
* `ClientWeapon` - No verb, ambiguous.


#### All Functions Must Have Return Nodes

All functions must have return nodes, no exceptions. Events are exempt, since a Blueprint event has no return node.

A return node marks where a function's execution ends. With graphs full of `Sequence`, `ForLoopWithBreak`, and backwards reroute nodes, explicit execution flow aids readability, maintenance, and debugging.

Return nodes also let the Blueprint compiler follow execution and warn about an unhandled return or bad flow. Adding a pin to a Sequence node, or logic after a loop that can return early, would otherwise slip past unnoticed.

#### No Function Should Have More Than 50 Nodes

No function should have more than 50 nodes; break anything larger into smaller functions for readability and maintenance.

These nodes do not count, as they add no complexity:

* Comment
* Route
* Cast
* Getting a Variable
* Breaking a Struct
* Function Entry
* Self

#### All Public Functions Should Have A Description

Aim this at public-facing or marketplace Blueprints, so others can navigate your API.

Any function with Public access needs its description filled out.

#### All Custom Static Plugin `BlueprintCallable` Functions Must Be Categorized By Plugin Name

`static` `BlueprintCallable` functions from a plugin take the plugin's name, or a subset of it, as their category, e.g. `Zed Camera Interface` or `Zed Camera Interface | Image Capturing`.

### Blueprint Graphs

This section covers things that apply to all Blueprint graphs.

#### No Spaghetti

Wires need clear beginnings and ends; you should never untangle wires mentally. The sections below work to reduce spaghetti.

#### Align Wires Not Nodes

Align wires, not nodes. You cannot control a node's size or pin locations, but you can control its position, and thus the wires. Straight wires give clear linear flow. Straighten wires with the Straighten Connections command with BP nodes selected. Hotkey: Q

Good example: The tops of the nodes are staggered to keep a perfectly straight white exec line.
![Aligned By Wires](https://raw.githubusercontent.com/Ultikynnys/ue5-style-guide/main/images/bp-graphs-align-wires-good.png "Aligned By Wires")

**Figure 2.** Good: Staggered node tops keep the white execution wire straight.

Bad Example: The tops of the nodes are aligned creating a wiggly white exec line.
![Bad](https://raw.githubusercontent.com/Ultikynnys/ue5-style-guide/main/images/bp-graphs-align-wires-bad.png "Wiggly")

**Figure 3.** Bad: Aligning node tops makes the execution wire wiggly.

Acceptable Example: Certain nodes might not cooperate no matter how you use the alignment tools. In this situation, try to minimize the wiggle by bringing the node in closer.
![Acceptable](https://raw.githubusercontent.com/Ultikynnys/ue5-style-guide/main/images/bp-graphs-align-wires-acceptable.png "Acceptable")

**Figure 4.** Acceptable: When nodes cannot align perfectly, reduce the wire wiggle by moving them closer.

#### White Exec Lines Are Top Priority

When you must choose, straighten the white exec line over any data lines.

#### Graphs Should Be Reasonably Commented

Wrap blocks of nodes in a comment describing their higher-level purpose. A short graph whose nodes each clearly serve the function's goal needs no comments beyond a good function name and description.

#### Graphs Should Handle Casting Errors Where Appropriate

A function or event that assumes a cast succeeds should report a logic failure when it does not, so others know why something 'supposed to work' failed. If the reference could fail, recover gracefully.

Not every cast needs failure handling: collision events and the like are expected to end quietly on a failed cast.

#### Graphs Should Not Have Any Dangling / Loose / Dead Nodes

Every node in every Blueprint graph must have a purpose; leave no dangling or unexecuted nodes.


## Static Meshes

This section will focus on Static Mesh assets and their internals.

### Static Mesh UVs

If Linter reports bad UVs and you cannot track them down, open the `.log` in your project's `Saved/Logs` folder for the exact reason.

### All Meshes Must Have UVs

Every mesh, however it is used, must have UVs.

### All Meshes Should Not Have Overlapping UVs for Lightmaps

Overlapping lightmap UVs invite visual artifacts. Authoring for this is not always worth the effort, so approach it in the asset creation pipeline rather than fixing it afterwards, unless it is already causing problems, for example during a scene lighting bake.

### LODs Should Be Set Up Correctly

A per-project judgment, but any mesh seen at varying distances should have proper LODs.

### Modular Socketless Assets Should Snap To The Grid Cleanly

A per-asset judgment: modular socketless assets should snap together cleanly on the project's grid settings.

The project chooses a power-of-2 or base-10 grid. For marketplace assets, Epic requires clean snapping at a grid of 10 units or larger.

### Meshes Must Have Collision Where They Are Used

Meshes requiring physical interaction or collision queries must have suitable, well-formed collision. Visual-only meshes, such as those used by Niagara effects, may omit collision.

### All Meshes Should Be Scaled Correctly

A per-project judgment: scale every asset correctly for its project. Designers and Blueprint authors should not tweak mesh scale to make things fit. In-engine scaling is a scale override, not a correction.


## Niagara

This section covers Niagara VFX assets: how they are named, how a System relates to its Emitters, and how to keep an effect scalable and cullable.

### No Spaces, Ever

Spaces and all white space are forbidden in identifiers. This matters most in Niagara, where HLSL and other scripting must reference identifiers and spaces make that hard or impossible.

(Original Contribution by [@dunenkoff](https://github.com/Allar/ue5-style-guide/issues/58))

### A System Is The Placeable Asset

A Niagara System is the asset a level or Blueprint places and references; a Niagara Emitter is a sub-asset the System consumes. Effects spawn as Systems, never bare Emitters.

Emitters, modules, and scripts are added from menus in the Niagara editor, not dragged from the Content Browser, so they need no visual distinction. Their prefixes serve search and the Content Browser, not authoring.

### Naming

Niagara assets use these prefixes: `NS_` for a System, `NE_` for an Emitter, `NM_` for a Module Script, and `NP_` for a Parameter Collection, with `NPI_` for an instance. The `NS_` prefix matches Epic's own Niagara convention; there is no need for `FXS_` or `VFX_` variants.

### Scalability Belongs To The Effect Type

A System's quality, significance, and culling come from its [Effect Type](https://dev.epicgames.com/documentation/en-us/unreal-engine/scalability-and-best-practices-for-niagara), not per-instance switches or Blueprint toggles. Define scalability once in the Effect Type: the effect then behaves the same wherever spawned and scales down for weaker targets without editing the System.

### Set Bounds Correctly

Prefer fixed bounds, covering the volume the effect can actually occupy. GPU emitters must use a supported bounds mode (fixed or programmable), because dynamic bounds are CPU-only; a CPU emitter may use dynamic bounds where justified. A System whose bounds do not contain the effect culls incorrectly: it pops out of view early, or never culls and keeps costing performance off screen.

### Pick The Right Emitter Sim Target

Choose an emitter's sim target from its requirements, not a single rule. A GPU emitter suits high particle counts and effects with no per-particle gameplay reads, and needs a supported (fixed or programmable) bounds mode. A CPU emitter is needed when gameplay reads or writes particle attributes, when determinism or replication matters, or when the count is low enough that GPU dispatch and readback overhead dominates. GPU emitters can collide against the world through scene depth, distance fields, or GPU ray tracing, within their limits; choose a CPU emitter when collision or reads must be exact. Treat any CPU/GPU crossover point as a heuristic and confirm it by profiling on target hardware; an emitter chosen only "because it was easier" is a performance bug waiting to happen.

### Reuse Emitters And Modules

Prefer a shared emitter or module over a copied-and-tweaked one. A duplicated graph drifts: a fix applied to one copy is missed by the others, and a new near-identical asset appears in the Content Browser every time. Put the variation in an exposed parameter, not in a new copy.


## Levels / Maps

This section will focus on Level assets and their internals.

### No Errors Or Warnings

All levels load with zero errors or warnings; fix any immediately to prevent cascading issues.

Run a map check on an open level with the console command "map check".

Linter is stricter than the editor and catches load errors the editor resolves on its own.

### Lighting Should Be Built

Levels often go unlit during development. Where precomputed lighting is enabled and used, lighting must be built for any test, internal, or shipping build, or any distributed build.

### No Player Visible Z Fighting

No [z-fighting](https://en.wikipedia.org/wiki/Z-fighting) anywhere the player can see.

### Compose Levels From Isolated Components

Build a playable area from multiple level components, not one monolithic map, except for a small or test level. The Persistent Level is the composition root: it references and coordinates components but holds no authored gameplay, lighting, audio, geometry, or segment content. Treat it as glue only, and do not edit it for ordinary feature work. This convention applies to projects using traditional level streaming; World Partition projects follow their project's World Partition architecture.

Name the Persistent Level with the `_P` suffix. Split independently owned work into focused components with the established suffixes (`_Gameplay`, `_Light`, `_Audio`, `_Geo`), and give extra world segments clear names such as `_Segment01`. Keep components separable so teammates can work on different areas without locking the whole level. Put all Level Blueprint logic in the `_Gameplay` component, never in the Persistent Level Blueprint.

This lowers multi-person edit conflicts: each contributor works in one component while the Persistent Level stays the stable assembly point. The example below shows a Persistent Level with separate gameplay, geometry, lighting, audio, and segment components.

![Example of a composed level with a Persistent Level and separate level components](https://raw.githubusercontent.com/Ultikynnys/ue5-style-guide/main/images/level-composition-example.png)

**Figure 5.** A Persistent Level assembling separate gameplay, geometry, lighting, audio, and segment components.

## Texture Guidelines

This section will focus on Texture assets and their internals.

### Dimensions Are Powers of 2

Every texture except a UI texture must have dimensions that are powers of 2; textures need not be square.

For example: `128x512`, `1024x1024`, `2048x1024`, `1024x2048`, `1x512`.

### Texture Density Should Be Uniform

Size every texture for its standard use case. Density varies by project but stays consistent within one.

For example, at 8 pixels per unit, a texture applied to a 100x100 unit cube is 1024x1024, the closest power of 2 to that density.

### Textures Should Be No Bigger than 8192

No texture dimension exceeds 8192 unless you have an explicit reason; a texture that large usually just wastes resources.

### Textures Should Be Grouped Correctly

Every texture has a Texture Group property used for LODing; set it correctly for the texture's use. For example, all UI textures belong in the UI texture group.
